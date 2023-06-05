import { Hero } from "./components/hero/Hero";
import { useOverviewContentModel } from "../../model/page_content/contentModel";
import { Page } from "../../modules/layout/Page/Page";
import { SectionsWithNav } from "../../modules/layout/MainContent/SectionsWithNav";
import { PageSectionContent } from "./components/page_section/PageSection";

export const Main = () => {
    const content = useOverviewContentModel();

    return !content ? null : (
        <Page>
            <Hero content={content.hero} />
            <SectionsWithNav
                sections={content.sectionOverviews.map((sectionOverview) => ({
                    id: sectionOverview.id,
                    title: sectionOverview.title,
                    node: <PageSectionContent externalId={sectionOverview.externalId} />,
                }))}
            />
        </Page>
    );
};
