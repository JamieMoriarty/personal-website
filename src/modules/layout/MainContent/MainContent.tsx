import { SectionOverview } from "../../../model/page_content/contentMappers";
import { PageSection } from "../Section/PageSection";
import css from "./MainContent.module.css";

interface MainContentProps {
    sections: Array<SectionOverview>;
}

export function MainContent({ sections }: MainContentProps) {
    return (
        <main className={css.container}>
            <Navigation sections={sections} />
            <ContentBody sections={sections} />
        </main>
    );
}

interface NavigationProps {
    sections: Array<SectionOverview>;
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

interface ContentBodyProps {
    sections: Array<SectionOverview>;
}

function ContentBody({ sections }: ContentBodyProps) {
    return (
        <article>
            {sections.map((section) => (
                <PageSection key={section.id} section={section} />
            ))}
        </article>
    );
}
