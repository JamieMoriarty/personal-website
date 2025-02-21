import { SkillsModel, toSkillsModel } from "../../../model/skills/SkillsModel";
import { Skill } from "../../../model/skills/skillMappers";
import { SkillArea } from "../skills/SkillArea";

interface SkillsListProps {
    skills: Array<Skill>;
}
export function SkillsList({ skills }: SkillsListProps) {
    const skillsModel = toSkillsModel(skills);
    return skillsModel !== undefined ? <SkillsSection skillsModel={skillsModel} /> : null;
}

interface SkillsSectionProps {
    skillsModel: SkillsModel;
}

const SkillsSection = function ({ skillsModel }: SkillsSectionProps) {
    return (
        <>
            {skillsModel.areas.map((area) => (
                <SkillArea
                    key={area.id}
                    area={area}
                    categories={skillsModel.categories.filterSkillsByArea(area)}
                />
            ))}
        </>
    );
};
