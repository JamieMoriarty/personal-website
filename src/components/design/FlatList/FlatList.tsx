import classnames from "classnames";
import { ReactNode } from "react";
import css from "./FlatList.module.css";

interface FlatListProps {
    className?: string;
    title?: string;
    children: Array<{ node: ReactNode; id: string }>;
}

function FlatListC({ className, title, children }: FlatListProps) {
    return (
        <article className={css.container}>
            {title && <Title title={title} />}
            <ul className={classnames(className, css.list)}>
                {children.map((child) => (
                    <li key={child.id}>{child.node}</li>
                ))}
            </ul>
        </article>
    );
}

interface TitleProps {
    title: string;
}

function Title({ title }: TitleProps) {
    return <h4 className={classnames("smallCaps", css.title)}>{title}</h4>;
}

export const FlatList = Object.assign(FlatListC, { Title });
