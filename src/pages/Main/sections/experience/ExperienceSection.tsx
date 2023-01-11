import { useExperienceModel } from "../../../../model/experience/ExperienceModel";

export const ExperienceSection = function ExperienceSection() {
    const data = useExperienceModel();

    const positions = data?.employers.flatMap((employer) => employer.positions);

    return (
        <section id="experience">
            <h2>Experience</h2>
            {!positions ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {positions.map((item) => (
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
