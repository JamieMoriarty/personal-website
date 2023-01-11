import { useExperience } from "../../../../model/experience/ExperienceModel";

export const ExperienceSection = function ExperienceSection() {
    const data = useExperience();
    console.log("experience loading?", !data);
    console.log(data?.employments);
    console.log(data?.employers);

    return (
        <section id="experience">
            <h2>Experience</h2>
            {!data ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.positions.map((item) => (
                        <li key={item.id}>
                            <>
                                {item.title}
                                <br />
                                {item.team}
                                <br />
                                {item?.additionalSpecifier ?? "not present"}
                                <br />
                                {item.startDate.toDateString()}
                                <br />
                                {item?.endDate?.toDateString() ?? "Now"}
                                <br />

                                <ul>
                                    {item.keyResponsibilities.map((respons) => (
                                        <li key={respons}>{respons}</li>
                                    ))}
                                </ul>
                                <p>
                                    <br />
                                    <code>{JSON.stringify(item.description)}</code>
                                    <br />
                                    {item.employer?.id}
                                    <br />
                                    <a
                                        href={item.employer?.homepageUrl ?? "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item.employer?.name}
                                    </a>
                                    <br />
                                    <img src={item.employer?.logo} />
                                </p>
                                <br />
                                <br />
                                <ul>
                                    {item?.skills?.map((skillItem) => (
                                        <li key={skillItem.id}>{skillItem.name}</li>
                                    ))}
                                </ul>
                            </>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
