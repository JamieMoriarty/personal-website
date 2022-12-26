import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

export const SKILLS_QUERY = gql(`
  query GetSkills {
    skillCollection (limit: 200) {
      items {
        name
        category {
          name
        }
        area {
          name
        }
      }
    }
  }
`);

export const useSkills = function () {
  const { data: rawData, loading, error } = useQuery(SKILLS_QUERY);
  const dataItems = rawData?.skillCollection?.items
    .map((item) =>
      item
        ? {
            name: item.name,
            category: item.category?.name,
            area: item.area?.name,
          }
        : item
    )
    .filter((item) => !!item);

  return {
    data: dataItems,
    loading,
    error,
  };
};
