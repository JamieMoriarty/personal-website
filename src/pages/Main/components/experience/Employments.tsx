import { Fragment } from "react";
import {
    EmploymentsList as EmploymentsListModel,
    Employment as EmploymentModel,
    Position as PositionModel,
} from "../../../../model/experience/experienceMappers";
import { FlatList } from "../../../../modules/design/FlatList/FlatList";

import css from "./Employments.module.css";
import { PositionDescription } from "./PositionDescription";

interface EmploymentsListProps {
    employmentsList: EmploymentsListModel;
}

export function Employments({ employmentsList }: EmploymentsListProps) {
    return (
        <section className={css.container}>
            {employmentsList.map((employment) => (
                <Fragment key={employment.id}>
                    {employment.employer.homepageUrl ? (
                        <a href={employment.employer.homepageUrl}>
                            <img
                                src={employment.employer.logo}
                                alt={`Logo for the company ${employment.employer.name}`}
                            />
                        </a>
                    ) : (
                        <img
                            src={employment.employer.logo}
                            alt={`Logo for the company ${employment.employer.name}`}
                        />
                    )}
                    <Employment employment={employment} />
                </Fragment>
            ))}
        </section>
    );
}

interface EmploymentProps {
    employment: EmploymentModel;
}

function Employment({ employment }: EmploymentProps) {
    return (
        <div className={css.details}>
            {employment.positions.map((position) => (
                <Position key={position.id} position={position} />
            ))}
        </div>
    );
}

interface PositionProps {
    position: PositionModel;
}

const Position = ({ position }: PositionProps) => (
    <article className={css.position}>
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
