import { Position as PositionModel } from "../../../model/experience/experienceMappers";
import { FlatList } from "../../design/FlatList/FlatList";
import { PositionDescription } from "./PositionDescription";

import css from "./Position.module.css";
import { format } from "date-fns";

interface PositionProps {
    position: PositionModel;
}

export function Position({ position }: PositionProps) {
    return (
        <article className={css.container}>
            <p>
                {format(position.startDate, "MMMM y")} -{" "}
                {position.endDate ? format(position.endDate, "MMMM y") : "Now"}
            </p>
            <h3 className={css.heading}>
                <strong>{position.title}</strong> @ {position.team}
            </h3>
            <div className={css.description}>
                {position.description ? (
                    <PositionDescription description={position.description} />
                ) : null}
                <h4>Key responsibilities:</h4>
                <ul className={css.keyResponsibilitiesList}>
                    {position.keyResponsibilities.map((respons) => (
                        <li key={respons}>{respons}</li>
                    ))}
                </ul>
            </div>
            <h4 className={css.skillsHeading}>Skills:</h4>
            <FlatList className={css.skillsList}>
                {position?.skills?.map((skillItem) => ({
                    node: <span>{skillItem.name}</span>,
                    id: skillItem.id,
                }))}
            </FlatList>
        </article>
    );
}
