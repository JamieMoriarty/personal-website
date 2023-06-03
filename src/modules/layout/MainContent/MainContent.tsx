import { SectionOverview } from "../../../model/page_content/contentMappers";
import {
    AboutSection,
    ExperienceSection,
    SkillsSection,
} from "../../../pages/Main/components";
import css from "./MainContent.module.css";

interface MainContentProps {
    sections: Array<SectionOverview>;
}

export function MainContent({ sections }: MainContentProps) {
    return (
        <main className={css.container}>
            <Navigation sections={sections} />
            <ContentBody />
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

function ContentBody() {
    return (
        <article>
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
        </article>
    );
}
