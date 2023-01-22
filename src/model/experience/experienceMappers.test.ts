import { afterEach, describe, expect, it, vi } from "vitest";
import {
    Employer,
    extractEmployers,
    extractEmployments,
    Position,
    toPositions,
} from "./experienceMappers";
import { apiPositionMock, apiSkillMock, january, positionMock } from "./mocks";

describe("Experience mapper: toPositions", () => {
    const getSkillByIdMock = vi.fn();

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should map all basic fiels of Position", () => {
        const mockPosition = {
            ...apiPositionMock,
            startDate: january(10).toISOString(),
            endDate: january(12).toISOString(),
        };
        const position = toPositions([mockPosition], getSkillByIdMock)[0];

        expect(position.id).toBe(apiPositionMock.sys.id);
        expect(position.title).toBe(apiPositionMock.title);
        expect(position.team).toBe(apiPositionMock.team);
        expect(position.additionalSpecifier).toBe(apiPositionMock.additionalSpecifier);
        expect(position.startDate).toEqual(january(10));
        expect(position.endDate).toEqual(january(12));
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
        const mockPosition = {
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
        function positionWithId(employer: Employer, id: string): Position | undefined {
            return employer.positions.find((position) => position.id === id);
        }

        expect(employers).toHaveLength(2);
        const firstEmployer = employers.find((employer) => employer.id === "employer 1");
        const secondEmployer = employers.find((employer) => employer.id === "employer 2");

        if (!firstEmployer || !secondEmployer) {
            throw Error("employers not present");
        }

        expect(firstEmployer?.positions).toHaveLength(3);
        expect(positionWithId(firstEmployer, "position 1")).toBeDefined();
        expect(positionWithId(firstEmployer, "position 2")).toBeDefined();
        expect(positionWithId(firstEmployer, "position 4")).toBeDefined();

        expect(secondEmployer?.positions).toHaveLength(2);
        expect(positionWithId(secondEmployer, "position 3")).toBeDefined();
        expect(positionWithId(secondEmployer, "position 5")).toBeDefined();
    });
});

describe("extractEmployments", () => {
    it("Should extract consecutive positions to same employement", () => {
        const positionsMock: Array<Position> = [
            positionMock("position 1", "employer 1", january(10), january(12)),
            positionMock("position 2", "employer 1", january(13), january(14)),
            positionMock("position 3", "employer 2", january(15), january(16)),
            positionMock("position 4", "employer 3", january(17), january(19)),
            positionMock("position 5", "employer 3", january(20), january(25)),
            positionMock("position 6", "employer 3", january(26), january(29)),
        ];

        const employments = extractEmployments(positionsMock);

        expect(employments.length).toBe(3);
        const employmentWithEmployerId = (id: string) =>
            employments.find((employment) => employment.employer.id === id);

        expect(employmentWithEmployerId("employer 1")?.positions).toHaveLength(2);
        expect(employmentWithEmployerId("employer 2")?.positions).toHaveLength(1);
        expect(employmentWithEmployerId("employer 3")?.positions).toHaveLength(3);
    });

    it("Should extract non-consecutive positions to different employement", () => {
        const positionsMock: Array<Position> = [
            positionMock("position 1", "employer 1", january(10), january(12)),
            positionMock("position 2", "employer 1", january(13), january(14)),
            positionMock("position 3", "employer 2", january(15), january(16)),
            positionMock("position 4", "employer 1", january(17), january(19)),
        ];

        const employments = extractEmployments(positionsMock);

        expect(employments.length).toBe(3);

        const employement1 = employments.find(
            (employment) => employment.employer.id === "employer 1"
        );
        const secondEmployment1 = employments
            .reverse()
            .find((employment) => employment.employer.id === "employer 1");

        expect(employement1).toBeDefined();
        expect(employement1?.id).not.toBe(secondEmployment1?.id);
        const positionsLengths = [employement1, secondEmployment1].map(
            (employment) => employment?.positions.length ?? 0
        );

        expect(positionsLengths).toEqual([1, 2]);
    });

    it("Should throw an error on non-consecutive positions to separate employements", () => {
        const positionsMock: Array<Position> = [
            positionMock("position 1", "employer 1", january(10), january(12)),
            positionMock("position 2", "employer 2", january(13), january(15)),
            positionMock("position 3", "employer 1", january(13), january(16)),
        ];

        expect(() => extractEmployments(positionsMock)).toThrow();
    });
});
