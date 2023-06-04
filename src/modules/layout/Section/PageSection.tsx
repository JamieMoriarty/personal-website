import classnames from "classnames";
import css from "./PageSection.module.css";
import { useSectionContent } from "../../../model/page_content/contentModel";
import {
    SectionOverview,
    isSectionWithReferencedContent,
} from "../../../model/page_content/contentMappers";
import { DocumentDisplay } from "../ContentfulDocument/DocumentDisplay";
import { Position } from "../../../model/experience/experienceMappers";
import { Skill } from "../../../model/skills/skillMappers";

interface PageSectionProps {
    className?: string;
    section: SectionOverview;
}

export function PageSection({ className, section }: PageSectionProps) {
    const sectionContent = useSectionContent(section.externalId);
    return (
        <section id={section.id} className={classnames(css.container, className)}>
            <h2>{section.title}</h2>
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
        </section>
    );
}

interface ExperienceListProps {
    experience: Array<Position>;
}

function ExperienceList({ experience }: ExperienceListProps) {
    console.log("experience:", experience);
    return <></>;
}

interface SkillsListProps {
    skills: Array<Skill>;
}
function SkillsList({ skills }: SkillsListProps) {
    console.log("skills:", skills);
    return <></>;
}
