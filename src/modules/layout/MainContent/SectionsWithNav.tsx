import { ReactNode, useCallback } from "react";
import css from "./SectionsWithNav.module.css";
import { Section } from "../Section/Section";
import classnames from "classnames";

interface NavigableSection {
    id: string;
    title: string;
    node: ReactNode;
}

interface SectionsWithNavProps {
    sections: Array<NavigableSection>;
}

export function SectionsWithNav({ sections }: SectionsWithNavProps) {
    return (
        <main className={css.container}>
            <Navigation sections={sections} />
            <div>
                {sections.map((section) => (
                    <Section key={section.id} id={section.id} title={section.title}>
                        {section.node}
                    </Section>
                ))}
            </div>
        </main>
    );
}

interface NavigationProps {
    sections: Array<NavigableSection>;
}

function Navigation({ sections }: NavigationProps) {
    return (
        <nav className={css.nav}>
            {sections.map((sectionOverview) => (
                <NavigationLink identifier={sectionOverview.id} key={sectionOverview.id}>
                    {sectionOverview.title}
                </NavigationLink>
            ))}
        </nav>
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
