import { ApiHeroContent, SectionOverviewContent } from "../../api/content";

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
