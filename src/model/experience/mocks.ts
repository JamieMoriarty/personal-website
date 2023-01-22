import { sub } from "date-fns";
import { ExperienceApiResponse } from "../../api/experience";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { Skill } from "../skills/SkillsModel";
import { Employer, Position } from "./experienceMappers";

export const skillMock = (id: string): Skill => ({
    id,
    name: "test skill",
    area: {
        name: "test area",
        id: "area id",
    },
    category: {
        name: "test category",
        id: "category id",
    },
});

export const apiEmployerMock = (id: string) => ({
    sys: {
        id,
    },
    name: "Employer",
    logo: {
        url: "https://imageurl.com",
    },
    homepageUrl: "https://employer.com/",
});

export const apiSkillMock = (id: string) => ({
    sys: {
        id,
    },
});

export const apiPositionMock = {
    sys: {
        id: "position id",
    },
    title: "Back-end developer",
    team: "B2B mobile voice subscriptions",
    additionalSpecifier: "TDC erhverv",
    startDate: "2021-08-15T12:00:00.000+01:00",
    endDate: "2022-08-15T12:00:00.000+01:00",
    keyResponsibilities: [
        "Develop and maintain middle-layer software between front-end and legacy systems",
        "Transition existing software solution from monolith to microservice architecture",
        "Develop and maintain CI/CD tools (Jenkins, then Drone and Spinnaker deploying to Openshift later Rancher)",
    ],
    description: {
        json: {
            data: {},
            content: [
                {
                    data: {},
                    content: [
                        {
                            data: {},
                            marks: [],
                            value: "Back-end developer on cross-functional team (front-end, back-end, designers and business) handling mobile voice sales in B2B part of Nuuday. Initially an open-pages shop for new customers (now closed), later self-service for enterprise solutions.",
                            nodeType: "text",
                        },
                    ],
                    nodeType: "paragraph",
                },
            ],
            nodeType: "document",
        },
    },
    employer: apiEmployerMock("employer id"),
    skillsCollection: {
        items: [
            apiSkillMock("skill id 1"),
            apiSkillMock("skill id 2"),
            apiSkillMock("skill id 3"),
        ],
    },
} as ExperienceApiResponse;

export const positionMock = (
    id: string,
    employerId: string,
    startDate: Date = sub(new Date(), {
        days: 1,
    }),
    endDate: Date = new Date()
): Position => ({
    id,
    title: "Back-end developer",
    team: "B2B mobile voice subscriptions",
    additionalSpecifier: "TDC erhverv",
    startDate,
    endDate,
    keyResponsibilities: [
        "Develop and maintain middle-layer software between front-end and legacy systems",
        "Transition existing software solution from monolith to microservice architecture",
        "Develop and maintain CI/CD tools (Jenkins, then Drone and Spinnaker deploying to Openshift later Rancher)",
    ],
    description: {
        data: {},
        content: [
            {
                data: {},
                content: [
                    {
                        data: {},
                        marks: [],
                        value: "Back-end developer on cross-functional team (front-end, back-end, designers and business) handling mobile voice sales in B2B part of Nuuday. Initially an open-pages shop for new customers (now closed), later self-service for enterprise solutions.",
                        nodeType: "text",
                    },
                ],
                nodeType: "paragraph",
            },
        ],
        nodeType: "document",
    } as ContentfulDocument,
    employer: employerMock(employerId),
    skills: [skillMock("skill id 1"), skillMock("skill id 2"), skillMock("skill id 3")],
});

export const january = (day: number): Date => new Date(2023, 0, day);
export const employerMock = (id: string): Omit<Employer, "positions"> => ({
    id,
    name: "Employer",
    logo: "https://imageurl.com",
    homepageUrl: "https://employer.com/",
});
