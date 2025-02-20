import classnames from "classnames";
import { useCallback } from "react";

import css from "./Navigation.module.css";

export interface NavigableElement {
    id: string;
    title: string;
}

interface MainNavigationProps {
    elements: Array<NavigableElement>;
}

export function MainNavigation({ elements: sections }: MainNavigationProps) {
    return (
        <ul className={css.nav}>
            {sections.map((sectionOverview) => (
                <li key={sectionOverview.id}>
                    <NavigationLink
                        identifier={sectionOverview.id}
                        key={sectionOverview.id}
                    >
                        {sectionOverview.title}
                    </NavigationLink>
                </li>
            ))}
        </ul>
    );
}

interface NavigationLinkProps {
    identifier: string;
    children: string;
}

function NavigationLink({ identifier, children }: NavigationLinkProps) {
    const scrollIntoView = useCallback(() => {
        const element = window.document.getElementById(identifier);
        element?.scrollIntoView({
            block: "start",
            behavior: "smooth",
        });
    }, []);

    return (
        <button onClick={scrollIntoView} className={classnames(css.navLink, "body")}>
            {children}
        </button>
    );
}
