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

export const useApiExperience = () => useQuery(EXPERIENCE_QUERY);
