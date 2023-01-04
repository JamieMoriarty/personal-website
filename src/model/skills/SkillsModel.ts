import { useApiSkills } from "../../api/skills";
import { ApiSkillsResponse } from "../../api/skills";
import { toDefined } from "../../utils/types";

interface SkillsModel {
    skills: Array<Skill>;
    areas: Array<FullSkillArea>;
}

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

/**
 * @returns skills model (including convenience methods) IF api data is loaded, otherwise undefined
 */
export const useSkills = function (): SkillsModel | undefined {
    const apiSkills = useApiSkills();

    return toSkillsModel(apiSkills);
};

export function toSkillsModel(apiSkills: ApiSkillsResponse): SkillsModel | undefined {
    if (!apiSkills) {
        return undefined;
    }

    const skills = extractSkills(apiSkills);
    const areas = extractSkillAreas(skills);

    return { skills, areas };
}

function extractSkills(apiSkills: ApiSkillsResponse): Array<Skill> {
    return toDefined(apiSkills)
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
}

type FullSkillArea = SkillsArea & {
    skills: Array<Skill>;
};

function extractSkillAreas(skills: Array<Skill>): Array<FullSkillArea> {
    const areaArray = new Array<FullSkillArea>();
    skills.forEach((skill) => {
        const areaIndex = areaArray.findIndex(
            (existingArea) => existingArea.id === skill.area.id
        );
        if (areaIndex >= 0) {
            const area = areaArray[areaIndex];
            area.skills.push(skill);
        } else {
            const area = { ...skill.area, skills: [skill] };
            areaArray.push(area);
        }
    });

    return areaArray;
}
