import classnames from "classnames";
import { ReactNode } from "react";
import css from "./FlatList.module.css";

interface FlatListProps {
    className?: string;
    children: Array<{ node: ReactNode; id: string }>;
}

export function FlatList({ className, children }: FlatListProps) {
    return (
        <ul className={classnames(className, css.container)}>
            {children.map((child) => (
                <li key={child.id}>{child.node}</li>
            ))}
        </ul>
    );
}
