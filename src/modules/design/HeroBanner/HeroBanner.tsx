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
            <h1 className={css.headerTitle}>{heading}</h1>
            <p className={css.headerDetails}>{details}</p>
            <div className={css.headerImage}>{img}</div>
        </header>
    );
}
