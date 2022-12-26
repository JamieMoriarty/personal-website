import { useSkills } from "../../../../api/skills";

export const SkillsSection = function () {
  const { data, loading, error } = useSkills();
  console.log("loading?", loading);
  console.log("error", error);
  console.log(data);
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
                {item?.name} <strong>area:</strong> {item?.area}{" "}
                <strong>category: </strong>
                {item?.category}
              </>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
