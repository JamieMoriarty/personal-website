import { Skill, SkillsArea, SkillsCategory } from "../../../model/skills/skillMappers";
import { FlatList } from "../../design/FlatList/FlatList";

import css from "./SkillArea.module.css";
import classNames from "classnames";

interface SkillsCategoryProps {
    area: SkillsArea;
    categories: Array<SkillsCategory>;
}

export function SkillArea({ area, categories }: SkillsCategoryProps) {
    return (
        <section className={css.area}>
            <h3 className={classNames("smallHeader", css.areaName)}>{area.name}</h3>
            {categories.map((category) => (
                <SkillCategory key={category.id} category={category} />
            ))}
        </section>
    );
}

interface SkillCategoryProps {
    category: SkillsCategory;
}

const SkillCategory = ({ category }: SkillCategoryProps) => (
    <FlatList className={css.skillList} title={category.name}>
        {category.skills.map((skill) => ({
            node: <SkillName skill={skill} />,
            id: skill.id,
        }))}
    </FlatList>
);

const SkillName = ({ skill }: { skill: Skill }) => (
    <span className={css.skillName}>{skill.name}</span>
);
