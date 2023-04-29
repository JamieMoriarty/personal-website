import classnames from "classnames";
import { ReactNode } from "react";

import css from "./HeroBanner.module.css";

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
                    <a href="https://github.com/JamieMoriarty">GitHub</a>
                    <a href="https://www.linkedin.com/in/martin-søndergaard-løyche/">
                        LinkedIn
                    </a>
                </div>
            </section>
            <div className={css.headerImage}>{img}</div>
        </header>
    );
}
