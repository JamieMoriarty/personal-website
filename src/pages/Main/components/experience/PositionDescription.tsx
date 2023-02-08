import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface PositionDescriptionProps {
    description: ContentfulDocument;
}

export function PositionDescription({ description }: PositionDescriptionProps) {
    return <>{documentToReactComponents(description)}</>;
}
