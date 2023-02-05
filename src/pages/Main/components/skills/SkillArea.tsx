import { Fragment } from "react";
import { Skill, SkillsArea, SkillsCategory } from "../../../../model/skills/skillMappers";
import { FlatList } from "../../../../modules/design/FlatList/FlatList";

import css from "./SkillArea.module.css";

interface SkillsCategoryProps {
    area: SkillsArea;
    categories: Array<SkillsCategory>;
}

export function SkillArea({ area, categories }: SkillsCategoryProps) {
    return (
        <>
            <h3>{area.name}</h3>
            {categories.map((category) => (
                <SkillCategory key={category.id} category={category} />
            ))}
        </>
    );
}

interface SkillCategoryProps {
    category: SkillsCategory;
}

const SkillCategory = ({ category }: SkillCategoryProps) => (
    <>
        <h4 className={css.categoryTitle}>{category.name}</h4>
        <FlatList className={css.skillList}>
            {category.skills.map((skill) => ({
                node: <SkillName skill={skill} />,
                id: skill.id,
            }))}
        </FlatList>
    </>
);

const SkillName = ({ skill }: { skill: Skill }) => (
    <span className={css.skillName}>{skill.name}</span>
);
