import { useApiContent } from "../../api/content";
import { HeroContent, toHeroContent } from "./contentMappers";

export interface Content {
    hero: HeroContent;
}

export function useContentModel(): Content | undefined {
    const pageContent = useApiContent();

    return pageContent === undefined
        ? undefined
        : {
              hero: toHeroContent(pageContent.hero),
          };
}
