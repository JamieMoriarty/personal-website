import { SkillsArea, SkillsCategory } from "../../../model/skills/skillMappers";
import { FlatList } from "../../design/FlatList/FlatList";

import css from "./SkillArea.module.css";
import { SkillBadge } from "./SkillBadge";

interface SkillsCategoryProps {
    area: SkillsArea;
    categories: Array<SkillsCategory>;
}

export function SkillArea({ area, categories }: SkillsCategoryProps) {
    return (
        <section className={css.area}>
            <h3 className={"smallHeader"}>{area.name}</h3>
            <div className={css.areaContent}>
                {categories.map((category) => (
                    <SkillCategory key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
}

interface SkillCategoryProps {
    category: SkillsCategory;
}

const SkillCategory = ({ category }: SkillCategoryProps) => (
    <FlatList title={category.name}>
        {category.skills.map((skill) => ({
            node: <SkillBadge skill={skill} />,
            id: skill.id,
        }))}
    </FlatList>
);
