import { Hero } from "./components/hero/Hero";
import { useOverviewContentModel } from "../../model/page_content/contentModel";
import { Page } from "../../modules/layout/Page/Page";
import { MainContent } from "../../modules/layout/MainContent/MainContent";

export const Main = () => {
    const content = useOverviewContentModel();

    return !content ? null : (
        <Page>
            <Hero content={content.hero} />
            <MainContent sections={content.sectionOverviews} />
        </Page>
    );
};
