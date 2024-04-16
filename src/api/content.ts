import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { isShape, isString, isArray, maybeNull, isOneOf } from "../utils/validations";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import {
    ExperienceApiResponse,
    isApiExperience,
    isContentfulDocument,
} from "./experience";
import { ApiSkills, isApiSkills } from "./skills";

export const MAIN_CONTENT_QUERY = gql(`query GetContent {
  mainPageCollection {
    items {
      hero {
        title
        description
        shortDescription
        linksCollection(limit: 5) {
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
      sectionsCollection(limit: 5) {
        items {
          sys {
            id
          }
          title
          id
          content {
            ...on SkillsCollection {
              type
            }
            ...on ExperienceCollection {
              type
            }
          }
        }
      }
    }
  }
}`);

export const useApiMainContent = function ():
    | {
          hero: ApiHeroContent;
          sectionsCollection: {
              items: Array<SectionOverviewContent>;
          };
      }
    | undefined {
    const { data, loading, error } = useQuery(MAIN_CONTENT_QUERY);

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

export interface SectionOverviewContent {
    sys: {
        id: string;
    };
    title: string;
    id: string;
    content: null | {
        type: string;
    };
}

const isSectionOverviewContent = isShape<SectionOverviewContent>({
    sys: isShape({ id: isString }),
    title: isString,
    id: isString,
    content: maybeNull(
        isShape({
            type: isString,
        })
    ),
});

export interface ContentApiResponse {
    mainPageCollection: {
        items: Array<{
            hero: ApiHeroContent;
            sectionsCollection: {
                items: Array<SectionOverviewContent>;
            };
        }>;
    };
}

const isContentApiResponse = isShape<ContentApiResponse>({
    mainPageCollection: isShape({
        items: isArray(
            isShape({
                hero: isHeroApiResponse,
                sectionsCollection: isShape({
                    items: isArray(isSectionOverviewContent),
                }),
            })
        ),
    }),
});

const SECTION_QUERY = gql(`query GetSection($id: String!) {
    section(id: $id) {
      title
      description {
        json
      }
      content {
        ...on SkillsCollection {
          type
          skillsCollection {
            items {
              ...skillFields
            }
          }
        }
        ...on ExperienceCollection {
          type
          positionsCollection {
            items {
              ...positionFields
            }
          }
        }
      }
    }
  }
  
  fragment skillFields on Skill {
    sys {
      id
    }
    name
    category {
      sys {
        id
      }
      name
      sortOrder
    }
    area {
      sys {
        id
      }
      name
    }
  }
  
  fragment positionFields on Position {
    sys {
      id
    }
    title
    team
    additionalSpecifier
    startDate
    endDate
    keyResponsibilities
    description {
      json
    }
    employer {
      sys {
        id
      }
      name
      logo {
        url
      }
      homepageUrl
    }
    skillsCollection {
      items {
        sys {
          id
        }
      }
    }
  }`);

export function useApiSectionContent(
    id: string | undefined
): ApiSectionContent | undefined {
    const { data, loading, error } = useQuery(SECTION_QUERY, {
        variables: { id: id ?? "3fAnp6zf3b0hxBtTAmJuMz" },
    });

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return undefined;
    } else if (isApiSectionContent(data)) {
        return data;
    } else {
        throw Error("unexpected shape of data");
    }
}

export interface ApiSectionContent {
    section: {
        title: string;
        description: { json: ContentfulDocument } | null;
        content: ApiSkillsSectionContent | ApiExperienceSectionContent | null;
    };
}

export interface ApiSkillsSectionContent {
    type: string;
    skillsCollection: {
        items: Array<ApiSkills>;
    };
}

export const isApiSkillsSectionContent = isShape<ApiSkillsSectionContent>({
    type: isString,
    skillsCollection: isShape({
        items: isArray(isApiSkills),
    }),
});

export interface ApiExperienceSectionContent {
    type: string;
    positionsCollection: {
        items: Array<ExperienceApiResponse>;
    };
}

export const isApiExperienceSectionContent = isShape<ApiExperienceSectionContent>({
    type: isString,
    positionsCollection: isShape({
        items: isArray(isApiExperience),
    }),
});

const isApiSectionContent = isShape<ApiSectionContent>({
    section: isShape({
        title: isString,
        description: maybeNull(
            isShape({
                json: isContentfulDocument,
            })
        ),
        content: maybeNull(
            isOneOf(isApiSkillsSectionContent, isApiExperienceSectionContent)
        ),
    }),
});
