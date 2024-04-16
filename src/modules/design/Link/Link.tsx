import { ReactNode } from "react";

import css from "./Link.module.css";

export type To =
    | string
    | {
          url: string;
          query: Map<string, string>;
          hash: string;
      };

interface LinkProps {
    to: To;
    children: string;
    icon?: ReactNode;
}

export function Link({ to, children, icon }: LinkProps) {
    const href = typeof to === "string" ? to : to.url;
    return (
        <a href={href} className={css.container}>
            <span>{children}</span>
            {icon}
        </a>
    );
}
