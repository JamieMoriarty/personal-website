import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { isShape, isString, isArray, maybeNull } from "../utils/validations";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { isContentfulDocument } from "./experience";

export const CONTENT_QUERY = gql(`query GetContent {
    mainPageCollection {
      items {
        hero {
          title
          description
          shortDescription
          linksCollection (limit:5) {
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
        sectionsCollection(limit:100) {
          items {
            title
            description {
              json
            }
          }
        }
      }
    }
  }`);

export const useApiContent = function ():
    | {
          hero: ApiHeroContent;
          sectionsCollection: {
              items: Array<{
                  title: string;
                  description: { json: ContentfulDocument } | null;
              }>;
          };
      }
    | undefined {
    const { data, loading, error } = useQuery(CONTENT_QUERY);

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return undefined;
    } else if (!isContentApiResponse(data)) {
        throw Error("unexpected shape of data");
    } else {
        const mainPageCollection = data.mainPageCollection.items;
        if (mainPageCollection.length !== 1) {
            throw Error("unexpected shape of data, too many main pages!");
        }

        return data.mainPageCollection.items[0];
    }
};

export interface ContentApiResponse {
    mainPageCollection: {
        items: Array<{
            hero: ApiHeroContent;
            sectionsCollection: {
                items: Array<{
                    title: string;
                    description: { json: ContentfulDocument } | null;
                }>;
            };
        }>;
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

interface ApiSectionContent {
    title: string;
    description: { json: ContentfulDocument };
}

const isHeroApiResponse = isShape<ApiHeroContent>({
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
});

const isContentApiResponse = isShape<ContentApiResponse>({
    mainPageCollection: isShape({
        items: isArray(
            isShape({
                hero: isHeroApiResponse,
                sectionsCollection: isShape({
                    items: isArray(
                        isShape({
                            title: isString,
                            description: maybeNull(
                                isShape({ json: isContentfulDocument })
                            ),
                        })
                    ),
                }),
            })
        ),
    }),
});
