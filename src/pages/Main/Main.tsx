import { Hero } from "./components/hero/Hero";
import { useContentModel } from "../../model/page_content/contentModel";
import { Page } from "../../modules/layouts/Page/Page";
import { MainContent } from "../../modules/layouts/MainContent/MainContent";

export const Main = () => {
    const content = useContentModel();
    return !content ? null : (
        <Page>
            <Hero content={content.hero} />
            <MainContent />
        </Page>
    );
};
