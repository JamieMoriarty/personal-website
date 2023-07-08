import { Hero } from "./components/hero/Hero";
import { useOverviewContentModel } from "../../model/page_content/contentModel";
import { Page } from "../../modules/layout/Page/Page";
import { PageSectionContent } from "./components/page_section_content/PageSectionContent";
import { SectionOverview } from "../../model/page_content/contentMappers";
import { NavigableElement, MainNavigation } from "./components/navigation/Navigation";
import { Section } from "../../modules/layout/Section/Section";

import css from "./Main.module.css";

export const Main = () => {
    const content = useOverviewContentModel();

    return !content ? null : (
        <Page className={css.container}>
            <header className={css.header}>
                <Hero content={content.hero} />
            </header>
            <nav className={css.nav}>
                <MainNavigation
                    elements={extractNavigationInfo(content.sectionOverviews)}
                />
            </nav>
            <main className={css.main}>
                {content.sectionOverviews.map((overview) => (
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
