import { useApiSkills } from "../../api/skills";
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

export const useSkillsModel = function (skills: Array<Skill>): SkillsModel | undefined {
    return toSkillsModel(skills);
};

/**
 * @returns skills model (including convenience methods) IF api data is loaded, otherwise undefined
 */
export const useFullSkillsModel = function (): SkillsModel | undefined {
    const apiSkills = useApiSkills();

    return !apiSkills ? undefined : toSkillsModel(toSkills(apiSkills));
};

export function toSkillsModel(skills: Array<Skill>): SkillsModel | undefined {
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
