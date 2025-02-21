import { Fragment } from "react";
import {
    EmploymentsList as EmploymentsListModel,
    Employment as EmploymentModel,
} from "../../../model/experience/experienceMappers";
import { Position } from "./Position";

import css from "./EmploymentList.module.css";
import classnames from "classnames";

interface EmploymentsListProps {
    employmentsList: EmploymentsListModel;
}

export function EmploymentList({ employmentsList }: EmploymentsListProps) {
    return (
        <section className={css.container}>
            {employmentsList.map((employment, index, array) => (
                <Fragment key={employment.id}>
                    <div className={css.linkWrapper}>
                        {employment.employer.homepageUrl ? (
                            <a
                                href={employment.employer.homepageUrl}
                                className={css.employerLink}
                            >
                                <img
                                    className={css.employerLogo}
                                    src={employment.employer.logo}
                                    alt={`Logo for the company ${employment.employer.name}`}
                                />
                                <span
                                    className={classnames(
                                        css.employerName,
                                        "smallHeader"
                                    )}
                                >
                                    {employment.employer.name}
                                </span>
                            </a>
                        ) : (
                            <img
                                className={css.employerLogo}
                                src={employment.employer.logo}
                                alt={`Logo for the company ${employment.employer.name}`}
                            />
                        )}
                    </div>
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
