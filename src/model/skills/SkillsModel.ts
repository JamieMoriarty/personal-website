import { useApiSkills } from "../../api/skills";

type Skills =
    | {
          loading: true;
          data: undefined;
      }
    | {
          loading: false;
          data: Array<Skill>;
      };

export const useSkills = function (): Skills {
    const { data: rawData, loading } = useApiSkills();

    if (loading) {
        return {
            loading,
            data: undefined,
        };
    }

    const dataItems = rawData
        .map((item) =>
            item
                ? {
                      id: item.sys.id,
                      name: item.name,
                      category: {
                          id: item.category.sys.id,
                          name: item.category.name,
                      },
                      area: {
                          id: item.area.sys.id,
                          name: item.area?.name,
                      },
                  }
                : item
        )
        .filter((item) => !!item);

    return {
        data: dataItems,
        loading,
    };
};

export interface Skill {
    id: string;
    name: string;
    category: SkillsCategory;
    area: SkillsArea;
}

interface SkillsCategory {
    id: string;
    name: string;
}

interface SkillsArea {
    id: string;
    name: string;
}
