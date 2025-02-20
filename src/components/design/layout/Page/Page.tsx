import { ReactNode } from "react";

import css from "./Page.module.css";
import classnames from "classnames";

interface PageProps {
    className?: string;
    children: ReactNode;
}

export function Page({ children, className: c }: PageProps) {
    return <div className={classnames(c, css.container)}>{children}</div>;
}
