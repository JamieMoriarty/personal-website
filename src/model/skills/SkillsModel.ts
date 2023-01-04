import { useApiSkills } from "../../api/skills";

type Skills = Array<Skill> | undefined;

/**
 *
 * @returns array of skills IF api data is loaded, otherwise undefined
 */
export const useSkills = function (): Skills {
    const rawData = useApiSkills();

    const dataItems = rawData
        ?.map((item) =>
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

    return dataItems;
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
