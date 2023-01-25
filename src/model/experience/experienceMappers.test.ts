import { afterEach, describe, expect, it, vi } from "vitest";
import {
    Employer,
    extractEmployers,
    extractEmployments,
    Position,
    toPositions,
} from "./experienceMappers";
import {
    apiPositionMock,
    apiSkillMock,
    consecutivePositions,
    january,
    positionMock,
    positionWithSkills,
    skillMock,
} from "./mocks";

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

    it("Should extract non-consecutive positions to different employements", () => {
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

    it("Should be able to filter positions within employer based on a list of skills", () => {
        const positionsMock = consecutivePositions([
            positionWithSkills("position1", "employer1", [skillMock("skill1")]),
            positionWithSkills("position2", "employer1", [
                skillMock("skill1"),
                skillMock("skill2"),
            ]),
            positionWithSkills("position3", "employer1", [skillMock("skill3")]),
        ]);

        const filteredEmployments = extractEmployments(positionsMock).filterBySkills([
            skillMock("skill1"),
            skillMock("skill2"),
        ]);

        expect(filteredEmployments).toHaveLength(1);
        expect(filteredEmployments[0].positions).toHaveLength(1);
        expect(filteredEmployments[0].positions[0].id).toBe("position2");
    });

    it("Should be able to filter employments based on a list of skills", () => {
        const positionsMock = consecutivePositions([
            positionWithSkills("position1", "employer1", [skillMock("skill1")]),
            positionWithSkills("position2", "employer2", [
                skillMock("skill1"),
                skillMock("skill2"),
            ]),
            positionWithSkills("position4", "employer2", [skillMock("skill4")]),
            positionWithSkills("position3", "employer2", [
                skillMock("skill1"),
                skillMock("skill2"),
                skillMock("skill3"),
            ]),
            positionWithSkills("position5", "employer3", [skillMock("skill3")]),
        ]);

        const filteredEmployments = extractEmployments(positionsMock).filterBySkills([
            skillMock("skill1"),
            skillMock("skill2"),
        ]);

        expect(filteredEmployments).toHaveLength(1);
        expect(filteredEmployments[0].positions).toHaveLength(2);
        expect(filteredEmployments[0].positions[0].id).toBe("position3");
        expect(filteredEmployments[0].positions[1].id).toBe("position2");
    });

    it("Should be able to filter positions within employer based on an area", () => {
        const positionsMock = consecutivePositions([
            positionWithSkills("position1", "employer1", [skillMock("skill1", "area1")]),
            positionWithSkills("position3", "employer1", [skillMock("skill3", "area3")]),
            positionWithSkills("position2", "employer1", [
                skillMock("skill1", "area1"),
                skillMock("skill2", "area2"),
            ]),
        ]);

        const filteredEmployments = extractEmployments(positionsMock).filterByArea({
            id: "area1",
            name: "mock area",
        });

        expect(filteredEmployments).toHaveLength(1);
        expect(filteredEmployments[0].positions).toHaveLength(2);
        expect(filteredEmployments[0].positions[0].id).toBe("position2");
        expect(filteredEmployments[0].positions[1].id).toBe("position1");
    });

    it("Should be able to filter employments based on an area", () => {
        const positionsMock = consecutivePositions([
            positionWithSkills("position1", "employer1", [skillMock("skill1", "area1")]),
            positionWithSkills("position2", "employer2", [
                skillMock("skill1", "area1"),
                skillMock("skill2", "area2"),
            ]),
            positionWithSkills("position4", "employer2", [skillMock("skill4", "area4")]),
            positionWithSkills("position3", "employer2", [
                skillMock("skill1", "area1"),
                skillMock("skill2", "area2"),
                skillMock("skill3", "area3"),
            ]),
            positionWithSkills("position5", "employer3", [skillMock("skill3", "area3")]),
        ]);

        const filteredEmployments = extractEmployments(positionsMock).filterByArea({
            id: "area4",
            name: "mock area",
        });

        expect(filteredEmployments).toHaveLength(1);
        expect(filteredEmployments[0].positions).toHaveLength(1);
        expect(filteredEmployments[0].positions[0].id).toBe("position4");
    });
});
