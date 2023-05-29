import { PageSection } from "../../../../modules/layout/Section/PageSection";
import { useSkillsModel } from "../../../../model/skills/SkillsModel";
import { SkillArea } from "./SkillArea";

export const SkillsSection = function () {
    const skillsModel = useSkillsModel();

    return (
        <PageSection id="skills">
            <h2>Skills</h2>
            {!skillsModel ? (
                <p>Loading...</p>
            ) : (
                skillsModel.areas.map((area) => (
                    <SkillArea
                        key={area.id}
                        area={area}
                        categories={skillsModel.categories.filterSkillsByArea(area)}
                    />
                ))
            )}
        </PageSection>
    );
};
