import { add, sub } from "date-fns";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperienceApiResponse } from "../../api/experience";
import {
    extractEmployers,
    extractEmployments,
    Position,
    toPositions,
} from "./experienceMappers";
import { apiPositionMock, apiSkillMock, positionMock } from "./mocks";

describe("Experience mapper: toPositions", () => {
    const getSkillByIdMock = vi.fn();

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should map all basic fiels of Position", () => {
        const today = new Date();
        const yesterday = sub(today, { days: 1 });
        const mockPosition: ExperienceApiResponse = {
            ...apiPositionMock,
            startDate: yesterday.toISOString(),
            endDate: today.toISOString(),
        };
        const position = toPositions([mockPosition], getSkillByIdMock)[0];

        expect(position.id).toBe(apiPositionMock.sys.id);
        expect(position.title).toBe(apiPositionMock.title);
        expect(position.team).toBe(apiPositionMock.team);
        expect(position.additionalSpecifier).toBe(apiPositionMock.additionalSpecifier);
        expect(position.startDate).toEqual(yesterday);
        expect(position.endDate).toEqual(today);
        expect(position.keyResponsibilities).toEqual(apiPositionMock.keyResponsibilities);
    });

    it("should retrieve skills from skill model", () => {
        getSkillByIdMock.mockImplementation(() => apiSkillMock);

        const position = toPositions([apiPositionMock], getSkillByIdMock)[0];

        position.skills.forEach((skill) => {
            expect(skill).toEqual(apiSkillMock);
        });
    });

    it("should map missing optional properties to undefined", () => {
        const mockPosition: ExperienceApiResponse = {
            ...apiPositionMock,
            additionalSpecifier: null,
            endDate: null,
            description: null,
            employer: {
                ...apiPositionMock.employer,
                homepageUrl: null,
            },
        };

        const position = toPositions([mockPosition], getSkillByIdMock)[0];

        expect(position.additionalSpecifier).toBeUndefined();
        expect(position.endDate).toBeUndefined();
        expect(position.description).toBeUndefined();
        expect(position.employer.homepageUrl).toBeUndefined();
    });

    it("should map employer correctly", () => {
        const apiEmployer = apiPositionMock.employer;
        const position = toPositions([apiPositionMock], getSkillByIdMock)[0];

        expect(position.employer.id).toBe(apiEmployer.sys.id);
        expect(position.employer.logo).toBe(apiEmployer.logo.url);
        expect(position.employer.name).toBe(apiEmployer.name);
        expect(position.employer.homepageUrl).toBe(apiEmployer.homepageUrl);
    });
});

describe("extractEmployers", () => {
    it("Should extract all employers only once", () => {
        const positionsMock: Array<Position> = [
            positionMock("position 1", "employer 1"),
            positionMock("position 2", "employer 1"),
            positionMock("position 3", "employer 2"),
        ];

        const employers = extractEmployers(positionsMock);

        expect(employers).toHaveLength(2);
        expect(employers.find((employer) => employer.id === "employer 1")).toBeDefined();
        expect(employers.find((employer) => employer.id === "employer 2")).toBeDefined();
    });

    it("Should map all positions to relevant employer", () => {
        const positionsMock: Array<Position> = [
            positionMock("position 1", "employer 1"),
            positionMock("position 2", "employer 1"),
            positionMock("position 3", "employer 2"),
            positionMock("position 4", "employer 1"),
            positionMock("position 5", "employer 2"),
        ];

        const employers = extractEmployers(positionsMock);

        expect(employers).toHaveLength(2);
        const firstEmployer = employers.find((employer) => employer.id === "employer 1");
        const secondEmployer = employers.find((employer) => employer.id === "employer 2");

        expect(firstEmployer?.positions).toHaveLength(3);
        expect(
            firstEmployer?.positions.find((position) => position.id === "position 1")
        ).toBeDefined();
        expect(
            firstEmployer?.positions.find((position) => position.id === "position 2")
        ).toBeDefined();
        expect(
            firstEmployer?.positions.find((position) => position.id === "position 4")
        ).toBeDefined();

        expect(secondEmployer?.positions).toHaveLength(2);
        expect(
            secondEmployer?.positions.find((position) => position.id === "position 3")
        ).toBeDefined();
        expect(
            secondEmployer?.positions.find((position) => position.id === "position 5")
        ).toBeDefined();
    });
});

describe("extractEmployments", () => {
    it("Should extract at least one employment per employer", () => {
        const today = new Date();
        const positionsMock: Array<Position> = [
            positionMock(
                "position 1",
                "employer 1",
                sub(today, {
                    days: 10,
                }),
                sub(today, {
                    days: 8,
                })
            ),
            positionMock(
                "position 2",
                "employer 1",
                sub(today, {
                    days: 7,
                }),
                sub(today, {
                    days: 5,
                })
            ),
            positionMock(
                "position 3",
                "employer 2",
                sub(today, {
                    days: 3,
                }),
                sub(today, {
                    days: 2,
                })
            ),
        ];

        console.log(
            positionsMock.map((position) => [position.endDate, position.startDate])
        );

        const employments = extractEmployments(positionsMock);

        expect(employments.length).toBeGreaterThanOrEqual(2);
    });

    it("Should throw an error on non-consecutive positions to separate employements", () => {
        const today = new Date();
        const positionsMock: Array<Position> = [
            positionMock(
                "position 1",
                "employer 1",
                sub(today, {
                    days: 10,
                }),
                sub(today, {
                    days: 8,
                })
            ),
            positionMock(
                "position 2",
                "employer 2",
                sub(today, {
                    days: 7,
                }),
                sub(today, {
                    days: 5,
                })
            ),
        ];
        const firstPosition = positionsMock[0];
        const nonConsecutiveEmployment: Position = {
            ...firstPosition,
            startDate: add(firstPosition.endDate ?? new Date(), {
                days: 2,
            }),
            endDate: today,
        };
        positionsMock.push(nonConsecutiveEmployment);

        expect(() => extractEmployments(positionsMock)).toThrowError();
    });
});
