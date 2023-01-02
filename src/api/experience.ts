import { ApolloError, useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { GetExperienceQuery } from "../__generated__/graphql";

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

type ApiResponse =
    | {
          loading: true;
          data: undefined;
      }
    | {
          loading: false;
          data: GetExperienceQuery;
      };

export const useApiExperience = function (): ApiResponse {
    const { data, loading, error } = useQuery(EXPERIENCE_QUERY);

    if (error !== undefined) {
        throw error;
    }

    if (loading) {
        return {
            loading: true,
            data: undefined,
        };
    } else if (data !== undefined) {
        return {
            loading: false,
            data,
        };
    } else {
        throw Error("data was unexpectedly undefined");
    }
};
