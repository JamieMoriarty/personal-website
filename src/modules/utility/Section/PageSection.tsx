import classnames from "classnames";
import { HTMLProps } from "react";
import css from "./PageSection.module.css";

export function PageSection({ className, ...props }: HTMLProps<HTMLElement>) {
    return <section {...props} className={classnames(css.container, className)} />;
}
