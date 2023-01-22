import { ApiSkillsResponse } from "../../api/skills";
import { toDefined } from "../../utils/validations";

export interface Skill {
    id: string;
    name: string;
    category: Omit<SkillsCategory, "skills">;
    area: Omit<SkillsArea, "skills">;
}

export interface SkillCategories extends Array<SkillsCategory> {
    filterSkillsByArea: (area: SkillsArea) => Array<SkillsCategory>;
}

export interface SkillsCategory {
    id: string;
    name: string;
    skills: Array<Skill>;
}

export interface SkillsArea {
    id: string;
    name: string;
    skills: Array<Skill>;
}

export function toSkills(apiSkills: ApiSkillsResponse): Array<Skill> {
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

export function extractSkillAreas(skills: Array<Skill>): Array<SkillsArea> {
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

export function extractSkillCategories(skills: Array<Skill>): SkillCategories {
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

    const filterSkillsByArea = (area: SkillsArea) => {
        return categoryArray.map((category) => ({
            ...category,
            skills: category.skills.filter((skill) => skill.area.id === area.id),
        }));
    };

    return Object.assign(categoryArray, { filterSkillsByArea });
}
