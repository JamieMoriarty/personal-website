import { useApiMainContent } from "../../api/content";
import {
    HeroContent,
    SectionOverview,
    toHeroContent,
    toSectionOverview,
} from "./contentMappers";

export interface Content {
    hero: HeroContent;
    sectionOverviews: Array<SectionOverview>;
}

export function useContentModel(): Content | undefined {
    const pageContent = useApiMainContent();

    return pageContent === undefined
        ? undefined
        : {
              hero: toHeroContent(pageContent.hero),
              sectionOverviews:
                  pageContent.sectionsCollection.items.map(toSectionOverview),
          };
}
