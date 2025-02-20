import { useApiMainContent, useApiSectionContent } from "../../api/content";
import { useFullSkillsModel } from "../../model/skills/SkillsModel";
import {
    HeroContent,
    SectionContent,
    SectionOverview,
    toHeroContent,
    toSection,
    toSectionOverview,
} from "../../model/page_content/contentMappers";

export interface OverviewContent {
    hero: HeroContent;
    sections: Array<SectionOverview>;
}

export function useOverviewContentModel(): OverviewContent | undefined {
    const pageContent = useApiMainContent();

    return pageContent === undefined
        ? undefined
        : {
              hero: toHeroContent(pageContent.hero),
              sections: pageContent.sectionsCollection.items.map(toSectionOverview),
          };
}

export function useSectionContent(id: string | undefined): SectionContent | undefined {
    const apiResponse = useApiSectionContent(id);
    const skillsModel = useFullSkillsModel();

    return apiResponse && skillsModel && toSection(apiResponse, skillsModel.getSkillById);
}
