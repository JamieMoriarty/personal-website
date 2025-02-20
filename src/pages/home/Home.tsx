import { Hero } from "../../components/product/hero/Hero";
import { useOverviewContentModel } from "./contentModel";
import { Page } from "../../components/design/layout/Page/Page";
import { PageSectionContent } from "../../components/product/page_section_content/PageSectionContent";
import { SectionOverview } from "../../model/page_content/contentMappers";
import {
    NavigableElement,
    MainNavigation,
} from "../../components/product/navigation/Navigation";
import { Section } from "../../components/design/layout/Section/Section";

import css from "./Home.module.css";

/**
 * Think the ideal structure here would be something like:
 *      <Page>
 *        <Hero />
 *        <NavigableSections />
 *     </Page>
 *
 * Here, Hero would probably be a product component. Page and NavigableSections are design components.
 */
export const Home = () => {
    const content = useOverviewContentModel();

    return !content ? null : (
        <Page className={css.container}>
            <header className={css.header}>
                <Hero content={content.hero} />
            </header>
            <nav className={css.nav}>
                <MainNavigation elements={extractNavigationInfo(content.sections)} />
            </nav>
            <main className={css.main}>
                {content.sections.map((overview) => (
                    <Section key={overview.id} id={overview.id} title={overview.title}>
                        <PageSectionContent externalId={overview.externalId} />
                    </Section>
                ))}
            </main>
        </Page>
    );
};

function extractNavigationInfo(
    sectionOverviews: Array<SectionOverview>
): Array<NavigableElement> {
    return sectionOverviews.map((sectionOverview) => ({
        id: sectionOverview.id,
        title: sectionOverview.title,
    }));
}
