import { PageSection } from "../../../../modules/utility/Section/PageSection";
import { useExperienceModel } from "../../../../model/experience/ExperienceModel";
import { EmploymentsList } from "./EmploymentList";

export function ExperienceSection() {
    const data = useExperienceModel();

    const employments = data?.employments;

    return (
        <PageSection id="experience">
            <h2>Experience</h2>
            {!employments ? (
                <p>Loading...</p>
            ) : (
                <EmploymentsList employmentsList={employments} />
            )}
        </PageSection>
    );
}
