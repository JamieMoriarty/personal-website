import {
    AboutSection,
    ExperienceSection,
    SkillsSection,
} from "../../../pages/Main/components";
import css from "./MainContent.module.css";

export function MainContent() {
    return (
        <main className={css.container}>
            <Navigation />
            <ContentBody />
        </main>
    );
}

function Navigation() {
    return (
        <nav className={css.nav}>
            <a href="#about-me">About me</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
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
