import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import {
    ApiHeroContent,
    ApiSectionContent,
    SectionOverviewContent,
    isApiExperienceSectionContent,
    isApiSkillsSectionContent,
} from "../../api/content";
import { Position, toPositions } from "../experience/experienceMappers";
import { Skill, toSkills } from "../skills/skillMappers";

export interface HeroContent {
    title: string;
    description: string;
    shortDescription: string;
    links: Array<{
        label: string;
        url: string;
    }>;
    squareImageUrl: string;
    landscapeImageUrl: string;
}

export function toHeroContent(apiResponse: ApiHeroContent): HeroContent {
    return {
        title: apiResponse.title,
        description: apiResponse.description,
        shortDescription: apiResponse.shortDescription,
        links: apiResponse.linksCollection.items,
        squareImageUrl: apiResponse.squareImage.url,
        landscapeImageUrl: apiResponse.landscapeImage.url,
    };
}

export interface SectionOverview {
    title: string;
    id: string;
    externalId: string;
    contentType?: SectionOverviewContentType;
}

export type SectionOverviewContentType = "skills" | "experience";

export function toSectionOverview(apiResponse: SectionOverviewContent): SectionOverview {
    return {
        title: apiResponse.title,
        id: apiResponse.id,
        externalId: apiResponse.sys.id,
        contentType:
            apiResponse.content?.type === "skills" ||
            apiResponse.content?.type === "experience"
                ? apiResponse.content?.type
                : undefined,
    };
}

export interface SectionContent {
    title: string;
    description?: ContentfulDocument;
    content?: SkillSectionContent | ExperienceSectionContent;
}

interface SkillSectionContent {
    type: "skills";
    skills: Array<Skill>;
}

interface ExperienceSectionContent {
    type: "experience";
    positions: Array<Position>;
}

export function toSection(
    apiResponse: ApiSectionContent,
    getSkillById: (id: string) => Skill
): SectionContent | undefined {
    const section = apiResponse.section;
    if (section.content === null) {
        return {
            title: section.title,
            description: section.description?.json,
        };
    } else if (
        section.content.type === "skills" &&
        isApiSkillsSectionContent(section.content)
    ) {
        return {
            title: section.title,
            description: section.description?.json,
            content: {
                type: "skills" as const,
                skills: toSkills(section.content.skillsCollection.items),
            },
        };
    } else if (
        section.content.type === "experience" &&
        isApiExperienceSectionContent(section.content)
    ) {
        return {
            title: section.title,
            description: section.description?.json,
            content: {
                type: "experience" as const,
                positions: toPositions(
                    section.content.positionsCollection.items,
                    getSkillById
                ),
            },
        };
    }
}
