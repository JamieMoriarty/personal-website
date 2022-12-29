import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export const SKILLS_QUERY = gql(`
  query GetSkills {
    skillCollection (limit: 200) {
      items {
        sys {
          id
        }
        name
        category {
          sys {
            id
          }
          name
        }
        area {
          sys {
            id
          }
          name
        }
      }
    }
  }
`);

export const useApiSkills = () => useQuery(SKILLS_QUERY);
