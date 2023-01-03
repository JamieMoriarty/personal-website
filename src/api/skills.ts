import { useQuery } from "@apollo/client";
import { hasId, WithSysId } from ".";
import { isArray, isShape, isString } from "../utils/types";
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

type ApiSkillsResponse =
    | { loading: true; data: undefined }
    | { loading: false; data: Array<ApiSkills> };

export const useApiSkills = (): ApiSkillsResponse => {
    const { data, loading, error } = useQuery(SKILLS_QUERY);

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return {
            data: undefined,
            loading,
        };
    } else if (data?.skillCollection?.items === undefined) {
        throw Error("data was unexpectedly undefined");
    } else if (isValidSkillsResponse(data.skillCollection.items)) {
        return {
            data: data.skillCollection.items,
            loading,
        };
    } else {
        throw Error("Data did not have correct shape :(");
    }
};

type ApiSkills = {
    name: string;
    category: ApiSkillsCategory;
    area: ApiSkillsArea;
} & WithSysId;

type ApiSkillsCategory = {
    name: string;
} & WithSysId;

type ApiSkillsArea = {
    name: string;
} & WithSysId;

const isValidSkillsCategory = isShape<ApiSkillsCategory>({
    name: isString,
    sys: hasId,
});

const isValidSkillsArea = isShape<ApiSkillsArea>({
    name: isString,
    sys: hasId,
});

const isValidSkillsResponse = isArray(
    isShape<ApiSkills>({
        sys: hasId,
        name: isString,
        category: isValidSkillsCategory,
        area: isValidSkillsArea,
    })
);
