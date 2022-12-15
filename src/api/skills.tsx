import { gql } from "../__generated__";


export const SKILLS_QUERY = gql(`
    query GetSkills {
        skillAreaCollection (limit:5) {
          items {
            name
            skillsCollection {
              items {
                name
                category {
                  name
                }
              }
            }
          }
        }
      }
`)