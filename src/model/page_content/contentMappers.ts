import { ApiHeroContent } from "../../api/content";

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
