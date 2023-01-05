import { useSkills } from "../../../../model/skills/SkillsModel";

export const SkillsSection = function () {
    const skillsModel = useSkills();
    console.log("skills loading?", !skillsModel);
    console.log("skills data:", skillsModel);
    console.log(
        "filtered skills:",
        skillsModel?.categories.filterSkillsByArea(skillsModel?.areas[0].id)
    );
    return (
        <section id="skills">
            <h2>Skills</h2>
            {!skillsModel ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {skillsModel.skills.map((item) => (
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
