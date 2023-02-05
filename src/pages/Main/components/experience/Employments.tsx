import { Fragment } from "react";
import {
    EmploymentsList as EmploymentsListModel,
    Employment as EmploymentModel,
    Position as PositionModel,
} from "../../../../model/experience/experienceMappers";

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
                    <img
                        src={employment.employer.logo}
                        alt={`Logo for the company ${employment.employer.name}`}
                    />
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
            <h3 className={css.heading}>
                <span>{employment.employer.name}</span>
            </h3>
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
        {position.title}
        <br />
        {position.team}
        <br />
        {position?.additionalSpecifier ?? "not present"}
        <br />
        {position.startDate.toDateString()}
        <br />
        {position?.endDate?.toDateString() ?? "Now"}
        <br />

        <ul>
            {position.keyResponsibilities.map((respons) => (
                <li key={respons}>{respons}</li>
            ))}
        </ul>
        <p>
            <br />
            {position.description ? (
                <PositionDescription description={position.description} />
            ) : null}
            <br />
            <a
                href={position.employer?.homepageUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
            >
                {position.employer?.name} homepage
            </a>
            <br />
        </p>
        <ul>
            {position?.skills?.map((skillItem) => (
                <li key={skillItem.id}>{skillItem.name}</li>
            ))}
        </ul>
    </article>
);
