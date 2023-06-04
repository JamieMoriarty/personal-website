import {
    BLOCKS,
    Document as ContentfulDocument,
    MARKS,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import css from "./DocumentDisplay.module.css";
import { ReactNode } from "react";

interface DocumentDisplayProps {
    document: ContentfulDocument;
    className?: string;
}

export function DocumentDisplay({ document, className: c }: DocumentDisplayProps) {
    return (
        <section className={c}>
            {documentToReactComponents(document, {
                renderMark: {
                    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
                    [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
                    [MARKS.UNDERLINE]: (text) => <Underline>{text}</Underline>,
                },
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (_, children) => (
                        <Paragraph>{children}</Paragraph>
                    ),
                    [BLOCKS.HEADING_3]: (_, children) => <Heading3>{children}</Heading3>,
                    [BLOCKS.HEADING_5]: (_, children) => <Heading5>{children}</Heading5>,
                    [BLOCKS.HEADING_6]: (_, children) => <Heading6>{children}</Heading6>,
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
        </section>
    );
}

interface TextRendererProps {
    children: ReactNode;
}

function Heading3({ children }: TextRendererProps) {
    return <h2 className={css.heading}>{children}</h2>;
}

function Heading5({ children }: TextRendererProps) {
    return <h5 className={css.heading}>{children}</h5>;
}

function Heading6({ children }: TextRendererProps) {
    return <h6 className={css.subHeading}>{children}</h6>;
}

function Paragraph({ children }: TextRendererProps) {
    return <p className={css.paragraph}>{children}</p>;
}

function OrderedList({ children }: TextRendererProps) {
    return <ol className={css.list}>{children}</ol>;
}

function UnorderedList({ children }: TextRendererProps) {
    return <ul className={css.list}>{children}</ul>;
}

function ListItem({ children }: TextRendererProps) {
    return <li>{children}</li>;
}

function Bold({ children }: TextRendererProps) {
    return <span className={css.bold}>{children}</span>;
}

function Italic({ children }: TextRendererProps) {
    return <span className={css.italic}>{children}</span>;
}

function Underline({ children }: TextRendererProps) {
    return <span className={css.underline}>{children}</span>;
}
