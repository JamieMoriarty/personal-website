import { Position as PositionModel } from "../../../model/experience/experienceMappers";
import { FlatList } from "../../presentation/FlatList/FlatList";
import { PositionDescription } from "./PositionDescription";

import css from "./Position.module.css";
import { format } from "date-fns";
import classnames from "classnames";
import { SkillBadge } from "../skills/SkillBadge";

interface PositionProps {
    position: PositionModel;
}

export function Position({ position }: PositionProps) {
    return (
        <article className={classnames(css.container, "smallBody")}>
            <header className={css.header}>
                <h3 className={css.heading}>
                    <strong className="bodyBold">{position.title} @</strong>{" "}
                    <span className="body">{position.team}</span>
                </h3>
                <p className="smallCapsLight">
                    {format(position.startDate, "MMMM y")} -{" "}
                    {position.endDate ? format(position.endDate, "MMMM y") : "Now"}
                </p>
            </header>
            <section>
                {position.description ? (
                    <PositionDescription description={position.description} />
                ) : null}
            </section>
            <section className={css.responsibilitiesSection}>
                <h4>Key responsibilities:</h4>
                <ul className={css.keyResponsibilitiesList}>
                    {position.keyResponsibilities.map((respons) => (
                        <li key={respons}>{respons}</li>
                    ))}
                </ul>
            </section>
            <section className={css.skillsSection}>
                <h4 className={classnames("bodyBold", css.skillsSectionTitle)}>
                    Skills:
                </h4>
                <FlatList className={css.skillsList}>
                    {position?.skills?.map((skillItem) => ({
                        node: <SkillBadge skill={skillItem} small />,
                        id: skillItem.id,
                    }))}
                </FlatList>
            </section>
        </article>
    );
}
