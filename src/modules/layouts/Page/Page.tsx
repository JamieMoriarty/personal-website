import { ReactNode } from "react";

import css from "./Page.module.css";

interface PageProps {
    children: ReactNode;
}

export function Page({ children }: PageProps) {
    return <section className={css.container}>{children}</section>;
}
