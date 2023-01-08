import { ReactNode } from "react";
import css from "./MainPageLayout.module.css";

interface MainPageLayoutProps {
    header: (className: string) => ReactNode;
    nav: (className: string) => ReactNode;
    main: (className: string) => ReactNode;
}

export const MainPageLayout = ({ header, nav, main }: MainPageLayoutProps) => {
    return (
        <div className={css.container}>
            {header(css.header)}
            <div className={css.navContainer}>{nav(css.nav)}</div>
            {main(css.body)}
        </div>
    );
};
