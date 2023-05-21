import classnames from "classnames";
import { ReactNode } from "react";

import css from "./HeroBanner.module.css";
import { Link, To } from "../Link/Link";
import { ArrowUpRightIcon } from "@primer/octicons-react";
import { slugify } from "../../../utils/slugify";

interface HeroBannerProps {
    className?: string;
    heading: string;
    details?: string;
    img: ReactNode;
    links: Array<{
        to: To;
        label: string;
    }>;
}

export function HeroBanner({ className, heading, details, links, img }: HeroBannerProps) {
    return (
        <header className={classnames(css.header, className)}>
            <section className={css.textSection}>
                <h1 className={"header"}>{heading}</h1>
                <p className={"smallHeader"}>{details}</p>
                <div className={css.linkList}>
                    {links.map((linkDescriptor) => (
                        <Link
                            to={linkDescriptor.to}
                            key={slugify(linkDescriptor.label)}
                            icon={<ArrowUpRightIcon />}
                        >
                            {linkDescriptor.label}
                        </Link>
                    ))}
                </div>
            </section>
            <div className={css.headerImage}>{img}</div>
        </header>
    );
}
