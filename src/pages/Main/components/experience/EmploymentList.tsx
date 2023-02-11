import { Fragment } from "react";
import {
    EmploymentsList as EmploymentsListModel,
    Employment as EmploymentModel,
} from "../../../../model/experience/experienceMappers";
import { Position } from "./Position";

import css from "./EmploymentList.module.css";

interface EmploymentsListProps {
    employmentsList: EmploymentsListModel;
}

export function EmploymentList({ employmentsList }: EmploymentsListProps) {
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
