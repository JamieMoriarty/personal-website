import { ApiSkillsResponse, useApiSkills } from "../../api/skills";
import {
    extractSkillAreas,
    extractSkillCategories,
    Skill,
    SkillCategories,
    SkillsArea,
    toSkills,
} from "./skillMappers";

export interface SkillsModel {
    skills: Array<Skill>;
    areas: Array<SkillsArea>;
    categories: SkillCategories;
    getSkillById: (id: string) => Skill;
}

/**
 * @returns skills model (including convenience methods) IF api data is loaded, otherwise undefined
 */
export const useSkillsModel = function (): SkillsModel | undefined {
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

    const getSkillById = (id: string) => {
        const skill = skills.find((skill) => skill.id === id);
        if (!skill) {
            throw Error(`No skill with id: ${id}`);
        }

        return skill;
    };

    return {
        skills,
        areas,
        categories,
        getSkillById,
    };
}
