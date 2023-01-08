import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export const EXPERIENCE_QUERY = gql(`query GetExperience {
    positionCollection {
        items {
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
            hompageUrl
        }
        skillsCollection {
            items {
            sys {
                id
            }
            }
        }
        
        }
    }
}`);

type ApiExperienceResponse =
    | Array<{
          __typename?: "Position";
          title?: string | null;
          team?: string | null;
          additionalSpecifier?: string | null;
          startDate?: string | null;
          endDate?: string | null;
          keyResponsibilities?: Array<string | null> | null;
          sys: { __typename?: "Sys"; id: string };
          description?: {
              __typename?: "PositionDescription";
              json: unknown;
          } | null;
          employer?: {
              __typename?: "Employer";
              name?: string | null;
              hompageUrl?: string | null;
              sys: { __typename?: "Sys"; id: string };
              logo?: { __typename?: "Asset"; url?: string | null } | null;
          } | null;
          skillsCollection?: {
              __typename?: "PositionSkillsCollection";
              items: Array<{
                  __typename?: "Skill";
                  sys: { __typename?: "Sys"; id: string };
              } | null>;
          } | null;
      } | null>
    | undefined;

export const useApiExperience = function (): ApiExperienceResponse {
    const { data, loading, error } = useQuery(EXPERIENCE_QUERY);

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return undefined;
    } else if (data?.positionCollection?.items === undefined) {
        throw Error("data was unexpectedly undefined");
    } else {
        return data.positionCollection.items;
    }
};
