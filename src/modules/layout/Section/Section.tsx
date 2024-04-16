import classnames from "classnames";
import css from "./Section.module.css";
import { ReactNode } from "react";

interface SectionProps {
    className?: string;
    id: string;
    title: string;
    children?: ReactNode;
}

export function Section({ className, id, title, children }: SectionProps) {
    return (
        <section id={id} className={classnames(css.container, className)}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}
