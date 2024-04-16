import { HeroContent } from "../../../../model/page_content/contentMappers";
import { HeroBanner } from "../../../../modules/design/HeroBanner/HeroBanner";

import css from "./Hero.module.css";

interface HeroProps {
    className?: string;
    content: HeroContent;
}

export function Hero({ className, content }: HeroProps) {
    return content !== undefined ? (
        <HeroBanner
            className={className}
            heading={content.title}
            details={content.description}
            links={content.links.map((link) => ({ ...link, to: link.url }))}
            img={
                <picture>
                    <source
                        media="(max-width: 664px)"
                        srcSet={`${content.squareImageUrl}?fit=fill&w=${250}&h=${250}`}
                    />
                    <source
                        media="(max-width: 1087px)"
                        srcSet={`${
                            content.landscapeImageUrl
                        }?&fit=fill&w=${736}&h=${Math.round(736 / 1.71)}`}
                    />
                    <img
                        className={css.image}
                        src={`${content.squareImageUrl}?fit=fill&w=${391}&h=${391}`}
                        alt="Profile picture of Martin Løyche"
                    />
                </picture>
            }
        />
    ) : null;
}
