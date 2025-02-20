import classnames from "classnames";
import { Skill } from "../../../model/skills/skillMappers";

import css from "./SkillBadge.module.css";

interface SkillBadgeProps {
    skill: Skill;
    small?: boolean;
}

export const SkillBadge = ({ skill, small }: SkillBadgeProps) => (
    <span className={classnames(css.container, small && "smallBody")}>{skill.name}</span>
);
