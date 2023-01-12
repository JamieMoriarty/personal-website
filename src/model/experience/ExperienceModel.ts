import { ExperienceApiResponse, useApiExperience } from "../../api/experience";
import { SkillsModel, useSkillsModel } from "../skills/SkillsModel";
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

export const useExperienceModel = () => {
    const experienceApiResponse = useApiExperience();
    const skillsModel = useSkillsModel();

    return toExperienceModel(experienceApiResponse, skillsModel);
};

function toExperienceModel(
    apiResponse: Array<ExperienceApiResponse> | undefined,
    skillsModel: SkillsModel | undefined
): ExperienceModel | undefined {
    if (!apiResponse || !skillsModel) {
        return undefined;
    }
    const positions = toPositions(apiResponse, skillsModel);

    return {
        positions: positions.sort(comparePositionsByStartDate),
        employments: extractEmployments(positions),
        employers: extractEmployers(positions),
    };
}
