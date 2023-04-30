import { useApiContent } from "../../../../api/content";
import { HeroBanner } from "../../../../modules/design/HeroBanner/HeroBanner";

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
                <img
                    height={391}
                    width={391}
                    src={pageContent.hero.image.url}
                    alt="Profile picture of Martin Løyche"
                />
            }
        />
    ) : null;
}
