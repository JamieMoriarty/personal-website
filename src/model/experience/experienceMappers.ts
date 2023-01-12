import { parseISO, differenceInCalendarDays, compareDesc } from "date-fns";
import { ExperienceApiResponse, EmployerApiResponse } from "../../api/experience";
import { Skill, SkillsModel } from "../skills/SkillsModel";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";

export interface Position {
    id: string;
    title: string;
    team: string;
    additionalSpecifier?: string;
    startDate: Date;
    endDate?: Date;
    keyResponsibilities: Array<string>;
    description?: ContentfulDocument;
    skills: Array<Skill>;
    employer: Omit<Employer, "positions">;
}

export function toPositions(
    apiExperienceResponse: Array<ExperienceApiResponse>,
    skillsModel: SkillsModel
): Array<Position> {
    return apiExperienceResponse.map((experienceItem) => ({
        ...experienceItem,
        id: experienceItem.sys.id,
        title: experienceItem.title,
        team: experienceItem.team,
        additionalSpecifier: experienceItem.additionalSpecifier ?? undefined,
        startDate: parseISO(experienceItem.startDate),
        endDate: experienceItem.endDate ? parseISO(experienceItem.endDate) : undefined,
        keyResponsibilities: experienceItem.keyResponsibilities,
        description: experienceItem.description
            ? experienceItem.description.json
            : undefined,
        skills: experienceItem.skillsCollection.items.map((skillsItem) =>
            skillsModel.getSkillById(skillsItem.sys.id)
        ),
        employer: toEmployer(experienceItem.employer),
    }));
}

function toEmployer(employer: EmployerApiResponse): Omit<Employer, "positions"> {
    return {
        name: employer.name,
        homepageUrl: employer.homepageUrl ?? undefined,
        id: employer.sys.id,
        logo: employer.logo.url,
    };
}

export function extractEmployments(postions: Array<Position>): EmploymentsList {
    const sortedPositions = postions.sort(comparePositionsByStartDate);

    const groupedByEmployer: Array<Array<Position>> = sortedPositions.reduce(
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

    const employments = groupedByEmployer
        .filter((run) => run.length > 0)
        .map(toEmployment);

    const filterBySkills = (skills: Array<Skill>) =>
        employments.map((run) => ({
            ...run,
            positions: run.positions.filter((position) =>
                skills.every((skill) =>
                    position.skills.map((skill) => skill.id).includes(skill.id)
                )
            ),
        }));

    return Object.assign(employments, {
        filterBySkills,
    });
}

function toEmployment(postions: Array<Position>) {
    const firstPosition = postions[0];
    const lastPosition = postions[postions.length - 1];
    return {
        employer: firstPosition.employer,
        startDate: firstPosition.startDate,
        endDate: lastPosition.endDate,
        positions: postions,
    };
}

export function comparePositionsByStartDate(left: Position, right: Position) {
    return compareDesc(left.startDate, right.startDate);
}

export function extractEmployers(positions: Array<Position>): Array<Employer> {
    const employers: Array<Employer> = [];

    positions.forEach((position) => {
        const existingEmployer = employers.find(
            (employer) => position.employer.id === employer.id
        );
        if (existingEmployer) {
            existingEmployer.positions.push(position);
        } else {
            const newEmployer: Employer = { ...position.employer, positions: [position] };
            employers.push(newEmployer);
        }
    });

    return employers;
}

export interface Employer {
    id: string;
    name: string;
    logo: string;
    homepageUrl?: string;
    positions: Array<Position>;
}

interface Employment {
    startDate: Date;
    endDate?: Date;
    employer: Omit<Employer, "positions">;
    positions: Array<Position>;
}

export interface EmploymentsList extends Array<Employment> {
    filterBySkills(skills: Array<Skill>): Array<Employment>;
}
