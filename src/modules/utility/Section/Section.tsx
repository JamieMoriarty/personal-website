import classnames from "classnames";
import { HTMLProps } from "react";
import css from "./Section.module.css";

export function Section({ className, ...props }: HTMLProps<HTMLElement>) {
    return <section {...props} className={classnames(css.container, className)} />;
}
