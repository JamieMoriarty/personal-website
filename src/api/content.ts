import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { isShape, isString, isArray } from "../utils/validations";

export const CONTENT_QUERY = gql(`query GetContent {
    heroCollection {
      items {
        title
        description
        shortDescription
        linksCollection {
          items {
            label
            url
          }
        }
        squareImage {
          url
        }
        landscapeImage {
            url
          }
      }
    }
  }`);

export const useApiContent = function (): { hero: ApiHeroContent } | undefined {
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
            throw Error("unexpected shape of data, too many heroes defined");
        }

        return { hero: data.heroCollection.items[0] };
    }
};

export interface ContentApiResponse {
    heroCollection: {
        items: Array<ApiHeroContent>;
    };
}

export interface ApiHeroContent {
    title: string;
    description: string;
    shortDescription: string;
    linksCollection: {
        items: Array<{
            label: string;
            url: string;
        }>;
    };
    squareImage: {
        url: string;
    };
    landscapeImage: {
        url: string;
    };
}

const isContentApiResponse = isShape<ContentApiResponse>({
    heroCollection: isShape({
        items: isArray(
            isShape({
                title: isString,
                description: isString,
                shortDescription: isString,
                linksCollection: isShape({
                    items: isArray(
                        isShape({
                            label: isString,
                            url: isString,
                        })
                    ),
                }),
                squareImage: isShape({
                    url: isString,
                }),
                landscapeImage: isShape({
                    url: isString,
                }),
            })
        ),
    }),
});
