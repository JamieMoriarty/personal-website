import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { isShape, isString, isArray } from "../utils/validations";

export const CONTENT_QUERY = gql(`query GetContent {
    heroCollection {
      items {
        title
        description
        image {
          url
        }
      }
    }
  }`);

export const useApiContent = function (): { hero: HeroContent } | undefined {
    const { data, loading, error } = useQuery(CONTENT_QUERY);

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return undefined;
    } else if (!isContentApiResponse(data)) {
        throw Error("unexpected shape of data");
    } else {
        const hero = data.heroCollection.items;
        if (hero.length !== 1) {
            throw Error("unexpected shape of data");
        }

        return { hero: data.heroCollection.items[0] };
    }
};

export interface ContentApiResponse {
    heroCollection: {
        items: Array<HeroContent>;
    };
}

interface HeroContent {
    title: string;
    description: string;
    image: {
        url: string;
    };
}

const isContentApiResponse = isShape<ContentApiResponse>({
    heroCollection: isShape({
        items: isArray(
            isShape({
                title: isString,
                description: isString,
                image: isShape({
                    url: isString,
                }),
            })
        ),
    }),
});
