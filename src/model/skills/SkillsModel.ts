import { useApiSkills } from "../../api/skills";
import { ApiSkillsResponse } from "../../api/skills";
import { toDefined } from "../../utils/types";

interface SkillsModel {
    skills: Array<Skill>;
    areas: Array<SkillsArea>;
    categories: Array<SkillsCategory>;
}

export interface Skill {
    id: string;
    name: string;
    category: Omit<SkillsCategory, "skills">;
    area: Omit<SkillsArea, "skills">;
}

interface SkillsCategory {
    id: string;
    name: string;
    skills: Array<Skill>;
}

interface SkillsArea {
    id: string;
    name: string;
    skills: Array<Skill>;
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

    const skills = toSkills(apiSkills);
    const areas = extractSkillAreas(skills);
    const categories = extractSkillCategories(skills);

    return { skills, areas, categories };
}

function toSkills(apiSkills: ApiSkillsResponse): Array<Skill> {
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

function extractSkillAreas(skills: Array<Skill>): Array<SkillsArea> {
    const areaArray = new Array<SkillsArea>();
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

function extractSkillCategories(skills: Array<Skill>): Array<SkillsCategory> {
    const categoryArray = new Array<SkillsCategory>();
    skills.forEach((skill) => {
        const areaIndex = categoryArray.findIndex(
            (existingCategory) => existingCategory.id === skill.category.id
        );
        if (areaIndex >= 0) {
            const area = categoryArray[areaIndex];
            area.skills.push(skill);
        } else {
            const area = { ...skill.category, skills: [skill] };
            categoryArray.push(area);
        }
    });

    return categoryArray;
}
