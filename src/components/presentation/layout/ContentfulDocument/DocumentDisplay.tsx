import {
    Block,
    BLOCKS,
    Document as ContentfulDocument,
    Inline,
    MARKS,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import css from "./DocumentDisplay.module.css";
import { ReactNode } from "react";
import classnames from "classnames";

type DocumentDisplaySize = "small" | "large";
interface DocumentDisplayProps {
    document: ContentfulDocument;
    className?: string;
    size?: DocumentDisplaySize;
}

export function DocumentDisplay({
    document,
    className: c,
    size = "large",
}: DocumentDisplayProps) {
    return (
        <section className={c}>
            {documentToReactComponents(document, {
                renderMark: {
                    [MARKS.BOLD]: (text) => <Bold size={size}>{text}</Bold>,
                    [MARKS.ITALIC]: (text) => <Italic size={size}>{text}</Italic>,
                    [MARKS.UNDERLINE]: (text) => (
                        <Underline size={size}>{text}</Underline>
                    ),
                },
                renderNode: RenderNodes[size],
            })}
        </section>
    );
}

const RenderNodes: {
    [key in DocumentDisplaySize]: {
        [key in BLOCKS]?: (node: Block | Inline, children: ReactNode) => ReactNode;
    };
} = {
    large: {
        [BLOCKS.PARAGRAPH]: (_, children) => (
            <Paragraph size={"large"}>{children}</Paragraph>
        ),
        [BLOCKS.HEADING_3]: (_, children) => (
            <Heading3 size={"large"}>{children}</Heading3>
        ),
        [BLOCKS.HEADING_5]: (_, children) => (
            <Heading5 size={"large"}>{children}</Heading5>
        ),
        [BLOCKS.HEADING_6]: (_, children) => (
            <Heading6 size={"large"}>{children}</Heading6>
        ),
        [BLOCKS.OL_LIST]: (_, children) => (
            <OrderedList size={"large"}>{children}</OrderedList>
        ),
        [BLOCKS.UL_LIST]: (_, children) => (
            <UnorderedList size={"large"}>{children}</UnorderedList>
        ),
        [BLOCKS.LIST_ITEM]: (_, children) => (
            <ListItem size={"large"}>{children}</ListItem>
        ),
        [BLOCKS.HR]: () => <hr />,
    },
    small: {
        [BLOCKS.PARAGRAPH]: (_, children) => (
            <Paragraph size="small">{children}</Paragraph>
        ),
        [BLOCKS.HEADING_1]: (_, children) => <Heading5 size="small">{children}</Heading5>,
        [BLOCKS.HEADING_2]: (_, children) => <Heading5 size="small">{children}</Heading5>,
        [BLOCKS.HEADING_3]: (_, children) => <Heading5 size="small">{children}</Heading5>,
        [BLOCKS.HEADING_4]: (_, children) => <Heading5 size="small">{children}</Heading5>,
        [BLOCKS.HEADING_5]: (_, children) => <Heading5 size="small">{children}</Heading5>,
        [BLOCKS.HEADING_6]: (_, children) => <Heading6 size="small">{children}</Heading6>,
        [BLOCKS.OL_LIST]: (_, children) => (
            <OrderedList size="small">{children}</OrderedList>
        ),
        [BLOCKS.UL_LIST]: (_, children) => (
            <UnorderedList size="small">{children}</UnorderedList>
        ),
        [BLOCKS.LIST_ITEM]: (_, children) => <ListItem size="small">{children}</ListItem>,
        [BLOCKS.HR]: () => <hr />,
    },
};

interface TextRendererProps {
    size: DocumentDisplaySize;
    children: ReactNode;
}
const SizeClassNames: { [key in DocumentDisplaySize]: string } = {
    small: css.small,
    large: css.large,
};

function Heading3({ children, size }: TextRendererProps) {
    return <h2 className={classnames(css.heading, SizeClassNames[size])}>{children}</h2>;
}

function Heading5({ children, size }: TextRendererProps) {
    return <h5 className={classnames(css.heading, SizeClassNames[size])}>{children}</h5>;
}

function Heading6({ children, size }: TextRendererProps) {
    return (
        <h6 className={classnames(css.subHeading, SizeClassNames[size])}>{children}</h6>
    );
}

function Paragraph({ children, size }: TextRendererProps) {
    return <p className={classnames(css.paragraph, SizeClassNames[size])}>{children}</p>;
}

function OrderedList({ children, size }: TextRendererProps) {
    return <ol className={classnames(css.list, SizeClassNames[size])}>{children}</ol>;
}

function UnorderedList({ children, size }: TextRendererProps) {
    return <ul className={classnames(css.list, SizeClassNames[size])}>{children}</ul>;
}

function ListItem({ children, size }: TextRendererProps) {
    return <li className={SizeClassNames[size]}>{children}</li>;
}

function Bold({ children, size }: TextRendererProps) {
    return <span className={classnames(css.bold, SizeClassNames[size])}>{children}</span>;
}

function Italic({ children, size }: TextRendererProps) {
    return (
        <span className={classnames(css.italic, SizeClassNames[size])}>{children}</span>
    );
}

function Underline({ children, size }: TextRendererProps) {
    return (
        <span className={classnames(css.underline, SizeClassNames[size])}>
            {children}
        </span>
    );
}
