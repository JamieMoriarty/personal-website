import { Document as ContentfulDocument } from "@contentful/rich-text-types";
//import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface PositionDescriptionProps {
    description: ContentfulDocument;
}

export function PositionDescription({ description }: PositionDescriptionProps) {
    return <code>{JSON.stringify(description)}</code>;

    /*
    This is how I think it SHOULD work, but apparently the good people at Contentful have other ideas :'(
    return documentToReactComponents(description);
    */
}
