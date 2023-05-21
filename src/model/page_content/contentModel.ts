import { useApiContent } from "../../api/content";
import { HeroContent, toHeroContent } from "./contentMappers";

export interface Content {
    hero?: HeroContent;
}

export function useContentModel(): Content {
    const pageContent = useApiContent();

    return {
        hero: pageContent?.hero ? toHeroContent(pageContent.hero) : undefined,
    };
}
