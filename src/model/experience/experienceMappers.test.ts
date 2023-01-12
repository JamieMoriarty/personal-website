import { sub } from "date-fns";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperienceApiResponse } from "../../api/experience";
import { SkillsModel, Skill } from "../skills/SkillsModel";
import { toPositions } from "./experienceMappers";

describe("Experience mapper: toPositions", () => {
    const getSkillByIdMock = vi.fn();
    const mockSkillsModel: SkillsModel = {
        skills: [],
        areas: [],
        categories: Object.assign([]),
        getSkillById: getSkillByIdMock,
    };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should map all basic fiels of Position", () => {
        const today = new Date();
        const yesterday = sub(today, { days: 1 });
        const mockPosition: ExperienceApiResponse = {
            ...basePosition,
            startDate: yesterday.toISOString(),
            endDate: today.toISOString(),
        };
        const position = toPositions([mockPosition], mockSkillsModel)[0];

        expect(position.id).toBe(basePosition.sys.id);
        expect(position.title).toBe(basePosition.title);
        expect(position.team).toBe(basePosition.team);
        expect(position.additionalSpecifier).toBe(basePosition.additionalSpecifier);
        expect(position.startDate).toEqual(yesterday);
        expect(position.endDate).toEqual(today);
        expect(position.keyResponsibilities).toEqual(basePosition.keyResponsibilities);
    });

    it("should retrieve skills from skill model", () => {
        getSkillByIdMock.mockImplementation(() => randomSkill);

        const position = toPositions([basePosition], mockSkillsModel)[0];

        position.skills.forEach((skill) => {
            expect(skill).toEqual(randomSkill);
        });
    });

    it("should map missing optional properties to undefined", () => {
        const mockPosition: ExperienceApiResponse = {
            ...basePosition,
            additionalSpecifier: null,
            endDate: null,
            description: null,
        };

        const position = toPositions([mockPosition], mockSkillsModel)[0];

        expect(position.additionalSpecifier).toBeUndefined();
        expect(position.endDate).toBeUndefined();
        expect(position.description).toBeUndefined();
    });
});

const randomSkill: Skill = {
    id: "random",
    name: "test skill",
    area: {
        name: "test area",
        id: "area id",
    },
    category: {
        name: "test category",
        id: "category id",
    },
};

const basePosition = {
    sys: {
        id: "12z7n5rmlXl4GZCpnyEtzv",
    },
    title: "Back-end developer",
    team: "B2B mobile voice subscriptions",
    additionalSpecifier: "TDC erhverv",
    startDate: "2021-08-15T12:00:00.000+01:00",
    endDate: null,
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
    employer: {
        sys: {
            id: "4hZbzoTaMCp4SMTNnxfni7",
        },
        name: "Nuuday",
        logo: {
            url: "https://images.ctfassets.net/24872jp5m9ag/7yXpY0VelozITbfKZuZkU4/472d463af69954f73060212173c66d22/nuuday-logo.svg",
        },
        homepageUrl: "https://nuuday.com/",
    },
    skillsCollection: {
        items: [
            {
                sys: {
                    id: "3OaHV910ZNEE62BEzqnJhT",
                },
            },
            {
                sys: {
                    id: "4uzrPKBo1965JMAnAEzP4d",
                },
            },
            {
                sys: {
                    id: "5hZTYfM0XRirQFsineKALf",
                },
            },
            {
                sys: {
                    id: "jdyzEE2HdkTs5DaCIr9MP",
                },
            },
            {
                sys: {
                    id: "5ozU5AqiMgmnG2S3sSW6Qa",
                },
            },
        ],
    },
} as ExperienceApiResponse;
