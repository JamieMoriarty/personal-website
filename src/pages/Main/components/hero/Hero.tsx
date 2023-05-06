import { useApiContent } from "../../../../api/content";
import { HeroBanner } from "../../../../modules/design/HeroBanner/HeroBanner";

import css from "./Hero.module.css";

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    const pageContent = useApiContent();

    return pageContent !== undefined ? (
        <HeroBanner
            className={className}
            heading={pageContent.hero.title}
            details={pageContent.hero.description}
            img={
                <picture>
                    {/* <source
                        media="(min-width: 1088px)"
                        srcSet={`${
                            pageContent.hero.squareImage.url
                        }?fit=fill&w=${391}&h=${391}`}
                    /> */}
                    <source
                        media="(max-width: 664px)"
                        srcSet={`${
                            pageContent.hero.squareImage.url
                        }?fit=fill&w=${250}&h=${250}`}
                    />
                    <source
                        media="(max-width: 1087px)"
                        srcSet={`${
                            pageContent.hero.landscapeImage.url
                        }?&fit=fill&w=${736}&h=${Math.round(736 / 1.71)}`}
                    />
                    <img
                        className={css.image}
                        src={`${
                            pageContent.hero.squareImage.url
                        }?fit=fill&w=${391}&h=${391}`}
                        alt="Profile picture of Martin Løyche"
                    />
                </picture>
            }
        />
    ) : null;
}
