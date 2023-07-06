import {
    BLOCKS,
    Document as ContentfulDocument,
    MARKS,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import css from "./PositionDescription.module.css";
import { ReactNode } from "react";
import classNames from "classnames";

interface PositionDescriptionProps {
    className?: string;
    description: ContentfulDocument;
}

export function PositionDescription({
    className,
    description,
}: PositionDescriptionProps) {
    return (
        <section className={classNames(css.container, className)}>
            {documentToReactComponents(description, {
                renderMark: {
                    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
                    [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
                    [MARKS.UNDERLINE]: (text) => <Underline>{text}</Underline>,
                },
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (_, children) => (
                        <Paragraph>{children}</Paragraph>
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
        </section>
    );
}

interface TextRendererProps {
    children: ReactNode;
}

function MainHeading({ children }: TextRendererProps) {
    return <h5 className={css.heading}>{children}</h5>;
}

function SubHeading({ children }: TextRendererProps) {
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
