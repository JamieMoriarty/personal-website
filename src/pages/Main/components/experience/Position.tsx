import { Position as PositionModel } from "../../../../model/experience/experienceMappers";
import { FlatList } from "../../../../modules/design/FlatList/FlatList";
import { PositionDescription } from "./PositionDescription";

import css from "./Position.module.css";

interface PositionProps {
    position: PositionModel;
}

export function Position({ position }: PositionProps) {
    return (
        <article className={css.container}>
            <p>
                {position.startDate.toDateString()} -{" "}
                {position?.endDate?.toDateString() ?? "Now"}
            </p>
            <p>
                <strong>{position.title}</strong> @ {position.team}
            </p>
            <br />
            {position.description ? (
                <PositionDescription description={position.description} />
            ) : null}
            <h4>Key responsibilities:</h4>
            <ul className={css.keyResponsibilitiesList}>
                {position.keyResponsibilities.map((respons) => (
                    <li key={respons}>{respons}</li>
                ))}
            </ul>
            <br />
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
