import { ReactNode } from "react";
import css from "./MainContent.module.css";
import { Section } from "../Section/Section";

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
                <a href={`#${sectionOverview.id}`} key={sectionOverview.id}>
                    {sectionOverview.title}
                </a>
            ))}
        </nav>
    );
}
