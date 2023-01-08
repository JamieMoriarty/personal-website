import { useExperience } from "../../../../model/experience/ExperienceModel";

export const ExperienceSection = function ExperienceSection() {
    const positions = useExperience();
    console.log("experience loading?", !positions);

    return (
        <section id="experience">
            <h2>Experience</h2>
            {!positions ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {positions.map((item) => (
                        <li key={item?.sys.id ?? "unnamed item"}>
                            <p>
                                {item?.title}
                                <br />
                                {item?.team}
                                <br />
                                {item?.additionalSpecifier}
                                <br />
                                {item?.startDate}
                                <br />
                                {item?.endDate}
                                <br />
                            </p>
                            <ul>
                                {item?.keyResponsibilities?.map((respons) => (
                                    <li key={respons ?? "empty"}>{respons}</li>
                                ))}
                            </ul>
                            <p>
                                <br />
                                <code>{JSON.stringify(item?.description?.json)}</code>
                                <br />
                                {item?.employer?.sys.id}
                                <br />
                                <a
                                    href={item?.employer?.hompageUrl ?? "#"}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item?.employer?.name}
                                </a>
                                <br />
                                <img src={item?.employer?.logo?.url ?? "#"} />
                            </p>
                            <br />
                            <br />
                            <ul>
                                {item?.skillsCollection?.items.map((item) => (
                                    <li key={item?.sys.id}>{item?.sys.id}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
