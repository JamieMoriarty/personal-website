import { isSectionWithReferencedContent } from "../../../../model/page_content/contentMappers";
import { useSectionContent } from "../../../../model/page_content/contentModel";
import { DocumentDisplay } from "../../../../modules/layout/ContentfulDocument/DocumentDisplay";

import { toExperienceModel } from "../../../../model/experience/ExperienceModel";
import { Position } from "../../../../model/experience/experienceMappers";
import { EmploymentList } from "../../../../modules/domain/experience/EmploymentList";
import { Skill } from "../../../../model/skills/skillMappers";
import { toSkillsModel } from "../../../../model/skills/SkillsModel";
import { SkillsSection } from "../../../../modules/domain/skills/SkillsSection";

interface SectionProps {
    externalId: string;
}

export function PageSectionContent({ externalId }: SectionProps) {
    const sectionContent = useSectionContent(externalId);
    return (
        <>
            {!sectionContent ? (
                <p>loading...</p>
            ) : (
                <>
                    {sectionContent.description && (
                        <DocumentDisplay document={sectionContent.description} />
                    )}
                    {isSectionWithReferencedContent(sectionContent) ? (
                        <>
                            {sectionContent.content.type === "experience" ? (
                                <ExperienceList
                                    experience={sectionContent.content.positions}
                                />
                            ) : sectionContent.content.type === "skills" ? (
                                <SkillsList skills={sectionContent.content.skills} />
                            ) : null}
                        </>
                    ) : null}
                </>
            )}
        </>
    );
}

interface ExperienceListProps {
    experience: Array<Position>;
}

function ExperienceList({ experience }: ExperienceListProps) {
    const experienceModel = toExperienceModel(experience);
    return experienceModel !== undefined ? (
        <EmploymentList employmentsList={experienceModel.employments} />
    ) : null;
}

interface SkillsListProps {
    skills: Array<Skill>;
}
function SkillsList({ skills }: SkillsListProps) {
    const skillsModel = toSkillsModel(skills);
    return skillsModel !== undefined ? <SkillsSection skillsModel={skillsModel} /> : null;
}
