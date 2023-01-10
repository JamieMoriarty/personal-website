import {
    EmployerApiResponse,
    ExperienceApiResponse,
    useApiExperience,
} from "../../api/experience";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { Skill, SkillsModel, useSkills } from "../skills/SkillsModel";
import { compareDesc, differenceInCalendarDays, parseISO } from "date-fns";

export const useExperience = () => {
    const experienceApiResponse = useApiExperience();
    const skillsModel = useSkills();

    if (!experienceApiResponse || !skillsModel) {
        return undefined;
    }
    const positions = toPositions(experienceApiResponse, skillsModel);

    return {
        positions: positions.sort(comparePositionsByStartDate),
        employmentRuns: extractEmploymentRuns(positions),
    };
};

function toPositions(
    apiExperienceResponse: Array<ExperienceApiResponse>,
    skillsModel: SkillsModel
): Array<Position> {
    return apiExperienceResponse.map((experienceItem) => ({
        ...experienceItem,
        id: experienceItem.sys.id,
        additionalSpecifier: experienceItem.additionalSpecifier ?? undefined,
        startDate: parseISO(experienceItem.startDate),
        endDate: experienceItem.endDate ? parseISO(experienceItem.endDate) : undefined,
        skills: experienceItem.skillsCollection.items.map((skillsItem) =>
            skillsModel.getSkillById(skillsItem.sys.id)
        ),
        description: experienceItem.description
            ? experienceItem.description.json
            : undefined,
        employer: toEmployer(experienceItem.employer),
    }));
}

function toEmployer(employer: EmployerApiResponse): Employer {
    return {
        ...employer,
        id: employer.sys.id,
        logo: employer.logo.url,
    };
}

function toEmploymentRun(postions: Array<Position>) {
    const firstPosition = postions[0];
    const lastPosition = postions[postions.length - 1];
    return {
        employer: firstPosition.employer,
        startDate: firstPosition.startDate,
        endDate: lastPosition.endDate,
        positions: postions,
    };
}

function comparePositionsByStartDate(left: Position, right: Position) {
    return compareDesc(left.startDate, right.startDate);
}

function extractEmploymentRuns(postions: Array<Position>): EmploymentRunList {
    const sortedPositions = postions.sort(comparePositionsByStartDate);

    const runs: Array<Array<Position>> = sortedPositions.reduce(
        (result, position, index, array) => {
            const previousPosition = index > 0 ? array[index - 1] : undefined;
            if (
                !previousPosition ||
                position.employer.id !== previousPosition.employer.id ||
                !previousPosition.endDate ||
                differenceInCalendarDays(position.startDate, previousPosition.endDate) > 2
            ) {
                return [...result, [position]];
            } else {
                result[result.length - 1].push(position);
                return result;
            }
        },
        [[]] as Array<Array<Position>>
    );

    const employmentRuns = runs.filter((run) => run.length > 0).map(toEmploymentRun);

    const filterBySkills = (skills: Array<Skill>) =>
        employmentRuns.map((run) => ({
            ...run,
            positions: run.positions.filter((position) =>
                skills.every((skill) =>
                    position.skills.map((skill) => skill.id).includes(skill.id)
                )
            ),
        }));

    return Object.assign(employmentRuns, {
        filterBySkills,
    });
}

interface Position {
    id: string;
    title: string;
    team: string;
    additionalSpecifier?: string;
    startDate: Date;
    endDate?: Date;
    keyResponsibilities: Array<string>;
    description?: ContentfulDocument;
    skills: Array<Skill>;
    employer: Employer;
}

interface Employer {
    id: string;
    name: string;
    logo: string;
    homepageUrl?: string;
}

interface EmploymentRun {
    startDate: Date;
    endDate?: Date;
    employer: Employer;
    positions: Array<Position>;
}

interface EmploymentRunList extends Array<EmploymentRun> {
    filterBySkills(skills: Array<Skill>): Array<EmploymentRun>;
}
