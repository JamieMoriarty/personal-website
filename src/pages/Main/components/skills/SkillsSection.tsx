import { Fragment } from "react";
import { PageSection } from "../../../../modules/utility/Section/PageSection";
import { useSkillsModel } from "../../../../model/skills/SkillsModel";
import css from "./SkillsSection.module.css";
import { FlatList } from "../../../../modules/design/FlatList/FlatList";
import { Skill } from "../../../../model/skills/skillMappers";

export const SkillsSection = function () {
    const skillsModel = useSkillsModel();
    return (
        <PageSection id="skills">
            <h2>Skills</h2>
            {!skillsModel ? (
                <p>Loading...</p>
            ) : (
                skillsModel.areas.map((area) => (
                    <Fragment key={area.id}>
                        <h3>{area.name}</h3>
                        {skillsModel.categories
                            .filterSkillsByArea(area)
                            .map((category) => (
                                <Fragment key={category.id}>
                                    <h4 className={css.categoryTitle}>{category.name}</h4>
                                    <FlatList className={css.skillList}>
                                        {category.skills.map((skill) => ({
                                            node: <SkillName skill={skill} />,
                                            id: skill.id,
                                        }))}
                                    </FlatList>
                                </Fragment>
                            ))}
                    </Fragment>
                ))
            )}
        </PageSection>
    );
};

const SkillName = ({ skill }: { skill: Skill }) => (
    <span className={css.skillName}>{skill.name}</span>
);
