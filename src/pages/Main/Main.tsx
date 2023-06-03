import { Hero } from "./components/hero/Hero";
import {
    useOverviewContentModel,
    useSectionContent,
} from "../../model/page_content/contentModel";
import { Page } from "../../modules/layout/Page/Page";
import { MainContent } from "../../modules/layout/MainContent/MainContent";

export const Main = () => {
    const content = useOverviewContentModel();

    console.log(content);
    const firstSectionContent = useSectionContent(
        content?.sectionOverviews[0].externalId
    );
    console.log(firstSectionContent);

    return !content ? null : (
        <Page>
            <Hero content={content.hero} />
            <MainContent sections={content.sectionOverviews} />
        </Page>
    );
};
