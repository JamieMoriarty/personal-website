import classnames from "classnames";
import { ReactNode } from "react";

import css from "./HeroBanner.module.css";
import { Link } from "../Link/Link";
import { ArrowUpRightIcon } from "@primer/octicons-react";

interface HeroBannerProps {
    className?: string;
    heading: string;
    details?: string;
    img: ReactNode;
}

export function HeroBanner({ className, heading, details, img }: HeroBannerProps) {
    return (
        <header className={classnames(css.header, className)}>
            <section className={css.textSection}>
                <h1 className={"header"}>{heading}</h1>
                <p className={"smallHeader"}>{details}</p>
                <div className={css.linkList}>
                    <Link
                        to="https://github.com/JamieMoriarty"
                        icon={<ArrowUpRightIcon />}
                    >
                        GitHub
                    </Link>
                    <Link
                        to="https://www.linkedin.com/in/martin-søndergaard-løyche/"
                        icon={<ArrowUpRightIcon />}
                    >
                        LinkedIn
                    </Link>
                </div>
            </section>
            <div className={css.headerImage}>{img}</div>
        </header>
    );
}
