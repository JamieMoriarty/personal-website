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
    const detailParts = details?.split(/\n+/) ?? [];
    return (
        <article className={classnames(css.header, className)}>
            <section className={css.textSection}>
                <h1 className={"header"}>{heading}</h1>
                <p className={classnames("smallHeader", css.details)}>
                    {detailParts.map((part, index) => (
                        <span key={`detail_part_${index}`} className={css.detailsPart}>
                            {part}
                        </span>
                    ))}
                </p>
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
        </article>
    );
}
