import { describe, expect, it } from "vitest";
import { skillMock } from "../experience/mocks";
import { areaMock, categoryMock, skillsApiResponse } from "./mocks";
import {
    extractSkillAreas,
    extractSkillCategories,
    SkillsArea,
    SkillsCategory,
    toSkills,
} from "./skillMappers";

describe("Skills mapper: toSkills", () => {
    it("should map all basic fields", () => {
        const skills = toSkills(skillsApiResponse);

        const firstApiSkill = skillsApiResponse?.[0];
        const firstSkill = skills[0];

        // Skill:
        expect(firstSkill.id).toBe(firstApiSkill?.sys.id);
        expect(firstSkill.name).toBe(firstApiSkill?.name);

        // Area:
        expect(firstSkill.area.id).toBe(firstApiSkill?.area.sys.id);
        expect(firstSkill.area.name).toBe(firstApiSkill?.area.name);

        // Category:
        expect(firstSkill.category.id).toBe(firstApiSkill?.category.sys.id);
        expect(firstSkill.category.name).toBe(firstApiSkill?.category.name);
    });
});

describe("extractSkillAreas", () => {
    it("should extract all areas exactly once", () => {
        const skills = [
            { ...skillMock("skill 1"), area: areaMock("area 1") },
            { ...skillMock("skill 2"), area: areaMock("area 1") },
            { ...skillMock("skill 3"), area: areaMock("area 2") },
            { ...skillMock("skill 4"), area: areaMock("area 3") },
            { ...skillMock("skill 5"), area: areaMock("area 1") },
        ];

        const areas = extractSkillAreas(skills);

        expect(areas).toHaveLength(3);
        expect(areas.find((area) => area.id === "area 1")).toBeDefined();
        expect(areas.find((area) => area.id === "area 2")).toBeDefined();
        expect(areas.find((area) => area.id === "area 3")).toBeDefined();
    });

    it("should map skills to area correctly", () => {
        const skills = [
            { ...skillMock("skill 1"), area: areaMock("area 1") },
            { ...skillMock("skill 2"), area: areaMock("area 1") },
            { ...skillMock("skill 3"), area: areaMock("area 2") },
            { ...skillMock("skill 4"), area: areaMock("area 3") },
            { ...skillMock("skill 5"), area: areaMock("area 1") },
        ];

        const areas = extractSkillAreas(skills);

        const area1 = areas.find((area) => area.id === "area 1");
        const area2 = areas.find((area) => area.id === "area 2");
        const area3 = areas.find((area) => area.id === "area 3");

        const areaContainsSkillWithId = (
            area: SkillsArea | undefined,
            id: string
        ): boolean => !!area?.skills.find((skill) => skill.id === id);

        expect(area1?.skills).toBeDefined();
        expect(area1?.skills).toHaveLength(3);
        expect(areaContainsSkillWithId(area1, "skill 1")).toBeTruthy();
        expect(areaContainsSkillWithId(area1, "skill 2")).toBeTruthy();
        expect(areaContainsSkillWithId(area1, "skill 5")).toBeTruthy();

        expect(area2?.skills).toBeDefined();
        expect(area2?.skills).toHaveLength(1);
        expect(areaContainsSkillWithId(area2, "skill 3")).toBeTruthy();

        expect(area3?.skills).toBeDefined();
        expect(area3?.skills).toHaveLength(1);
        expect(areaContainsSkillWithId(area3, "skill 4")).toBeTruthy();
    });
});

describe("extractSkillCategories", () => {
    it("should extract all categories exactly once", () => {
        const skills = [
            { ...skillMock("skill 1"), category: categoryMock("category 1") },
            { ...skillMock("skill 2"), category: categoryMock("category 2") },
            { ...skillMock("skill 3"), category: categoryMock("category 3") },
            { ...skillMock("skill 4"), category: categoryMock("category 1") },
            { ...skillMock("skill 5"), category: categoryMock("category 1") },
        ];

        const categories = extractSkillCategories(skills);

        expect(categories).toHaveLength(3);
        expect(categories.find((category) => category.id === "category 1")).toBeDefined();
        expect(categories.find((category) => category.id === "category 2")).toBeDefined();
        expect(categories.find((category) => category.id === "category 3")).toBeDefined();
    });

    it("should map skills to category correctly", () => {
        const skills = [
            { ...skillMock("skill 1"), category: categoryMock("category 1") },
            { ...skillMock("skill 2"), category: categoryMock("category 2") },
            { ...skillMock("skill 3"), category: categoryMock("category 3") },
            { ...skillMock("skill 4"), category: categoryMock("category 1") },
            { ...skillMock("skill 5"), category: categoryMock("category 1") },
        ];

        const categories = extractSkillCategories(skills);

        const category1 = categories.find((category) => category.id === "category 1");
        const category2 = categories.find((category) => category.id === "category 2");
        const category3 = categories.find((category) => category.id === "category 3");

        const areaContainsSkillWithId = (
            category: SkillsCategory | undefined,
            id: string
        ): boolean => !!category?.skills.find((skill) => skill.id === id);

        expect(category1?.skills).toBeDefined();
        expect(category1?.skills).toHaveLength(3);
        expect(areaContainsSkillWithId(category1, "skill 1")).toBeTruthy();
        expect(areaContainsSkillWithId(category1, "skill 4")).toBeTruthy();
        expect(areaContainsSkillWithId(category1, "skill 5")).toBeTruthy();

        expect(category2?.skills).toBeDefined();
        expect(category2?.skills).toHaveLength(1);
        expect(areaContainsSkillWithId(category2, "skill 2")).toBeTruthy();

        expect(category3?.skills).toBeDefined();
        expect(category3?.skills).toHaveLength(1);
        expect(areaContainsSkillWithId(category3, "skill 3")).toBeTruthy();
    });
});
