import { useExperience } from "../../../../model/ExperienceModel";
import { useSkills } from "../../../../model/SkillsModel";

export const SkillsSection = function () {
  const { data, loading /*, error*/ } = useSkills();
  const {
    data: experienceData,
    loading: experienceLoading,
    error: experienceError,
  } = useExperience();
  console.log("loading?", experienceLoading);
  console.log("error", experienceError);
  console.log(experienceData);
  return (
    <section id="skills">
      <h2>Skills</h2>
      {loading || data === undefined ? (
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
