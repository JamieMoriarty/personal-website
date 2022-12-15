import { useQuery } from "@apollo/client"
import { Fragment } from "react";
import { SKILLS_QUERY } from "../../../../api/skills"

export const SkillsSection = function () {
    const { data, loading, error } = useQuery(SKILLS_QUERY);
    console.log("loading?", loading);
    console.log("error", error)
    console.log(data)
    return (
        <section id="skills">
            <h2>Skills</h2>
            {loading || data === undefined ?
                <p>Loading...</p> :
                data?.skillAreaCollection?.items.map(item => item !== undefined ? (
                    <Fragment key={item?.name ?? "unnamed item"}>
                        <h3>{item?.name}</h3>
                        <ul>
                            {item?.skillsCollection?.items.map(item => (
                                <li key={item?.name ?? "unnamed skill"}>
                                    <span><strong>{item?.name}</strong> ({item?.category?.name})</span>
                                </li>
                            )
                            )}
                        </ul>
                    </Fragment>
                ) : null)
            }
        </section>
    )
}