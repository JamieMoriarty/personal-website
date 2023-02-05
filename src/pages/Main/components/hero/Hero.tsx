import { HeroBanner } from "../../../../modules/design/HeroBanner/HeroBanner";

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    return (
        <HeroBanner
            className={className}
            heading="This is a short catchy title"
            details="This is slight longer - but still catchy - details text"
            img={<img src="#" alt="There should probably be an image here" />}
        />
    );
}
