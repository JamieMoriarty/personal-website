import { MainPageLayout } from "../../modules/layouts/MainPage";
import classNames from "classnames";
import { AboutSection, ExperienceSection, SkillsSection } from "./components";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../api";

import css from "./Main.module.css";
import { Hero } from "./components/hero/Hero";

export const Main = () => {
    return (
        <ApolloProvider client={client}>
            <MainPageLayout
                header={(c) => <Hero className={c} />}
                nav={(c) => (
                    <nav className={classNames(css.nav, c)}>
                        <a href="#about-me">About me</a>
                        <a href="#skills">Skills</a>
                        <a href="#experience">Experience</a>
                    </nav>
                )}
                main={(c) => (
                    <article className={classNames(css.main, c)}>
                        <AboutSection />
                        <SkillsSection />
                        <ExperienceSection />
                    </article>
                )}
            />
        </ApolloProvider>
    );
};
