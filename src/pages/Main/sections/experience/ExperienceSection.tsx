import { useExperience } from "../../../../model/ExperienceModel";

export const ExperienceSection = function ExperienceSection() {
  const { data, loading, error } = useExperience();
  console.log("loading?", loading);
  console.log("error", error);
  console.log(data);
  return (
    <section id="experience">
      <h2>Experience</h2>
      {loading || data === undefined ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.positionCollection?.items.map((item) => (
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
                <ul>
                  {item?.keyResponsibilities?.map((respons) => (
                    <li key={respons ?? "empty"}>{respons}</li>
                  ))}
                </ul>
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
                <br />
                <br />
                <ul>
                  {item?.skillsCollection?.items.map((item) => (
                    <li key={item?.sys.id}>{item?.sys.id}</li>
                  ))}
                </ul>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
