import { SkillsModel } from "../../../../model/skills/SkillsModel";
import { SkillArea } from "../../../../modules/domain/skills/SkillArea";

interface SkillsSectionProps {
    skillsModel: SkillsModel;
}

export const SkillsSection = function ({ skillsModel }: SkillsSectionProps) {
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
