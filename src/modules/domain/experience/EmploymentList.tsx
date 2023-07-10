import { Fragment } from "react";
import {
    EmploymentsList as EmploymentsListModel,
    Employment as EmploymentModel,
} from "../../../model/experience/experienceMappers";
import { Position } from "./Position";

import css from "./EmploymentList.module.css";

interface EmploymentsListProps {
    employmentsList: EmploymentsListModel;
}

export function EmploymentList({ employmentsList }: EmploymentsListProps) {
    return (
        <section className={css.container}>
            {employmentsList.map((employment, index, array) => (
                <Fragment key={employment.id}>
                    {employment.employer.homepageUrl ? (
                        <a href={employment.employer.homepageUrl}>
                            <img
                                className={css.employerLogo}
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
                    {index !== array.length - 1 && <div className={css.splitter} />}
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
        <section className={css.details}>
            {employment.positions.map((position) => (
                <Position key={position.id} position={position} />
            ))}
        </section>
    );
}
