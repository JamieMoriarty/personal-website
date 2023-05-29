import { PageSection } from "../../../../modules/layout/Section/PageSection";
import { useExperienceModel } from "../../../../model/experience/ExperienceModel";
import { EmploymentList } from "./EmploymentList";

export function ExperienceSection() {
    const data = useExperienceModel();

    const employments = data?.employments;

    return (
        <PageSection id="experience">
            <h2>Experience</h2>
            {!employments ? (
                <p>Loading...</p>
            ) : (
                <EmploymentList employmentsList={employments} />
            )}
        </PageSection>
    );
}
