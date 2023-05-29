import classnames from "classnames";
import { HTMLProps, ReactNode } from "react";
import css from "./PageSection.module.css";

interface PageSectionBaseProps extends Omit<HTMLProps<HTMLElement>, "children"> {
    title: string;
}

interface PageSectionDescriptionProps {
    description: string;
    children?: ReactNode;
}

interface PageSectionWithChildrenProps {
    description?: string;
    children: ReactNode;
}

type PageSectionProps = PageSectionBaseProps &
    (PageSectionDescriptionProps | PageSectionWithChildrenProps);

export function PageSection({
    className,
    title,
    description,
    children,
    ...props
}: PageSectionProps) {
    return (
        <section {...props} className={classnames(css.container, className)}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </section>
    );
}
