import { useApiExperience } from "../../api/experience";
import { useFullSkillsModel } from "../skills/SkillsModel";
import {
    Position,
    Employer,
    toPositions,
    extractEmployments,
    extractEmployers,
    EmploymentsList,
    comparePositionsByStartDate,
} from "./experienceMappers";

interface ExperienceModel {
    positions: Array<Position>;
    employments: EmploymentsList;
    employers: Array<Employer>;
}

export const useFullExperienceModel = () => {
    const experienceApiResponse = useApiExperience();
    const skillsModel = useFullSkillsModel();

    return (
        experienceApiResponse &&
        skillsModel &&
        toExperienceModel(toPositions(experienceApiResponse, skillsModel.getSkillById))
    );
};

export function toExperienceModel(
    positions: Array<Position>
): ExperienceModel | undefined {
    return {
        positions: positions.sort(comparePositionsByStartDate),
        employments: extractEmployments(positions),
        employers: extractEmployers(positions),
    };
}
