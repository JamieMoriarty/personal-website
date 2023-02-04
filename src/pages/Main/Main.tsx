import { MainPageLayout } from "../../modules/layouts/MainPage";
import classNames from "classnames";
import { ExperienceSection, SkillsSection } from "./components";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../api";

import css from "./Main.module.css";
import { PageSection } from "../../modules/utility/Section/PageSection";

export const Main = () => {
    return (
        <ApolloProvider client={client}>
            <MainPageLayout
                header={(c) => (
                    <header className={classNames(css.header, c)}>
                        <h1 className={css.headerTitle}>This is a short catchy title</h1>
                        <p className={css.headerDetails}>
                            This is slight longer - but still catchy - details text
                        </p>
                        <img
                            className={css.headerImage}
                            src="#"
                            alt="There should probably be an image here"
                        />
                    </header>
                )}
                nav={(c) => (
                    <nav className={classNames(css.nav, c)}>
                        <a href="#about-me">About me</a>
                        <a href="#skills">Skills</a>
                        <a href="#experience">Experience</a>
                    </nav>
                )}
                main={(c) => (
                    <article className={classNames(css.main, c)}>
                        <PageSection id="about-me">
                            <h2>About me</h2>
                            <p>
                                I'm like super awesome and stuff. Also, I have a PhD in
                                mathematics and two amazing kids!
                            </p>
                        </PageSection>
                        <SkillsSection />
                        <ExperienceSection />
                    </article>
                )}
            />
        </ApolloProvider>
    );
};
