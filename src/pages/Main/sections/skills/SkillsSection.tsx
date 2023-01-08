import { Fragment } from "react";
import { useSkills } from "../../../../model/skills/SkillsModel";
import css from "./SkillsSection.module.css";

export const SkillsSection = function () {
    const skillsModel = useSkills();
    return (
        <section id="skills">
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
                                    <ul className={css.list}>
                                        {category.skills.map((skill) => (
                                            <li key={skill.id}>{skill.name}</li>
                                        ))}
                                    </ul>
                                </Fragment>
                            ))}
                    </Fragment>
                ))
            )}
        </section>
    );
};
