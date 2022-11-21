import { MainPageLayout } from "../../components/layouts/MainPage";
import classNames from "classnames";
import css from "./Main.module.scss";

export const Main = () => {
    return (
        <MainPageLayout
            header={(c) => (<header className={classNames(css.header, c)}>
                <h1 className={css.headerTitle}>This is a short catchy title</h1>
                <p className={css.headerDetails}>This is slight longer - but still catchy - details text</p>
                <img className={css.headerImage} src="#" alt="There should probably be an image here" />
            </header>)}
            nav={c => (<nav className={classNames(css.nav, c)}>
                <a href="#about-me">About me</a>
                <a href="#techs">Techs</a>
                <a href="#experience">Experience</a>
            </nav>)}
            main={c => (
                <article className={classNames(css.main, c)}>
                    <section id="about-me">
                        <h2>About me</h2>
                        <p>I'm like super awesome and stuff. Also, I have a PhD in mathematics and two amazing kids!</p>
                    </section>
                    <section id="techs">
                        <h2>Techs</h2>
                        <p>I know TypeScript, React and mob-x. Also I have used Redux on a previous project
                            and used to do back-end in Java with SpringBoot as the framework</p>
                    </section>
                    <section id="experience">
                        <h2>Experience</h2>
                        <ol>
                            <li><strong>Matter (current):</strong>Front-ending, with a focus on front-of-frontend (also do other stuff though)</li>
                            <li><strong>Yousee:</strong>Front-ending, in webshops</li>
                            <li><strong>TDC Erhverv:</strong> Back-ending,</li>
                        </ol>
                    </section>
                </article>
            )}
        />
    )
}