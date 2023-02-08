import {
    BLOCKS,
    Document as ContentfulDocument,
    MARKS,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import css from "./PositionDescription.module.css";
import { ReactNode } from "react";

interface PositionDescriptionProps {
    description: ContentfulDocument;
}

export function PositionDescription({ description }: PositionDescriptionProps) {
    return (
        <>
            {documentToReactComponents(description, {
                renderMark: {
                    [MARKS.BOLD]: (text) => <span className={css.bold}>{text}</span>,
                    [MARKS.ITALIC]: (text) => <span className={css.italic}>{text}</span>,
                    [MARKS.UNDERLINE]: (text) => (
                        <span className={css.underline}>{text}</span>
                    ),
                },
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (_, children) => (
                        <p className={css.paragraph}>{children}</p>
                    ),
                    [BLOCKS.HEADING_1]: (_, children) => (
                        <MainHeading>{children}</MainHeading>
                    ),
                    [BLOCKS.HEADING_2]: (_, children) => (
                        <MainHeading>{children}</MainHeading>
                    ),
                    [BLOCKS.HEADING_3]: (_, children) => (
                        <MainHeading>{children}</MainHeading>
                    ),
                    [BLOCKS.HEADING_4]: (_, children) => (
                        <MainHeading>{children}</MainHeading>
                    ),
                    [BLOCKS.HEADING_5]: (_, children) => (
                        <MainHeading>{children}</MainHeading>
                    ),
                    [BLOCKS.HEADING_6]: (_, children) => (
                        <SubHeading>{children}</SubHeading>
                    ),
                    [BLOCKS.OL_LIST]: (_, children) => (
                        <OrderedList>{children}</OrderedList>
                    ),
                    [BLOCKS.UL_LIST]: (_, children) => (
                        <UnorderedList>{children}</UnorderedList>
                    ),
                    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
                    [BLOCKS.HR]: () => <hr />,
                },
            })}
        </>
    );
}

interface TextRendererProps {
    children: ReactNode;
}

function MainHeading({ children }: TextRendererProps) {
    return <h5>{children}</h5>;
}

function SubHeading({ children }: TextRendererProps) {
    return <h6>{children}</h6>;
}

function OrderedList({ children }: TextRendererProps) {
    return <ol>{children}</ol>;
}

function UnorderedList({ children }: TextRendererProps) {
    return <ul>{children}</ul>;
}

function ListItem({ children }: TextRendererProps) {
    return <li>{children}</li>;
}
