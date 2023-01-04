import { useSkills } from "../../../../model/skills/SkillsModel";

export const SkillsSection = function () {
    const data = useSkills();
    console.log("skills loading?", !data);
    console.log("skills data:", data);
    return (
        <section id="skills">
            <h2>Skills</h2>
            {!data ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item?.name ?? "unnamed item"}>
                            <>
                                {item?.name} <strong>area:</strong> {item?.area.name}{" "}
                                <strong>category: </strong>
                                {item?.category.name}
                            </>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};
