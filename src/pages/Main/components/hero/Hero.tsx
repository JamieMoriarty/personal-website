import { useContentModel } from "../../../../model/page_content/contentModel";
import { HeroBanner } from "../../../../modules/design/HeroBanner/HeroBanner";

import css from "./Hero.module.css";

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    const content = useContentModel();
    const heroContent = content.hero;

    return heroContent !== undefined ? (
        <HeroBanner
            className={className}
            heading={heroContent.title}
            details={heroContent.description}
            links={heroContent.links.map((link) => ({ ...link, to: link.url }))}
            img={
                <picture>
                    <source
                        media="(max-width: 664px)"
                        srcSet={`${
                            heroContent.squareImageUrl
                        }?fit=fill&w=${250}&h=${250}`}
                    />
                    <source
                        media="(max-width: 1087px)"
                        srcSet={`${
                            heroContent.landscapeImageUrl
                        }?&fit=fill&w=${736}&h=${Math.round(736 / 1.71)}`}
                    />
                    <img
                        className={css.image}
                        src={`${heroContent.squareImageUrl}?fit=fill&w=${391}&h=${391}`}
                        alt="Profile picture of Martin Løyche"
                    />
                </picture>
            }
        />
    ) : null;
}
