import { isSectionWithReferencedContent } from "../../../model/page_content/contentMappers";
import { useSectionContent } from "../../../pages/home/contentModel";
import { DocumentDisplay } from "../../design/layout/ContentfulDocument/DocumentDisplay";

import { toExperienceModel } from "../../../model/experience/ExperienceModel";
import { Position } from "../../../model/experience/experienceMappers";
import { EmploymentList } from "../experience/EmploymentList";
import { SkillsList } from "./SkillsList";

interface SectionContentProps {
    externalId: string;
}

export function PageSectionContent({ externalId }: SectionContentProps) {
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
