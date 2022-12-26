import { MainPageLayout } from "../../components/layouts/MainPage";
import classNames from "classnames";
import css from "./Main.module.scss";
import { SkillsSection } from "./sections/skills";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../api";

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
            <a href="#techs">Techs</a>
            <a href="#experience">Experience</a>
          </nav>
        )}
        main={(c) => (
          <article className={classNames(css.main, c)}>
            <section id="about-me">
              <h2>About me</h2>
              <p>
                I'm like super awesome and stuff. Also, I have a PhD in
                mathematics and two amazing kids!
              </p>
            </section>
            <SkillsSection />
          </article>
        )}
      />
    </ApolloProvider>
  );
};
