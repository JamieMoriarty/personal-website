import { ApiSkillsResponse } from "../../api/skills";
import { Skill, SkillsArea, SkillsCategory } from "./skillMappers";

export const categoryMock = (id: string): Omit<SkillsCategory, "skills"> => ({
    id,
    name: "random name",
    sortOrder: 0,
});

export const areaMock = (id: string): Omit<SkillsArea, "skills"> => ({
    id,
    name: "random name",
});

export const skillsMock = (id: string): Skill => ({
    id,
    name: "random name",
    area: areaMock("random area id"),
    category: categoryMock("random category id"),
});

export const skillsApiResponse: ApiSkillsResponse = [
    {
        sys: {
            id: "36NXU6Ew2LtwoKCaDu5eqJ",
        },
        name: "Redux",
        category: {
            sys: {
                id: "3gocfo5cHx1eoxPeGK0TZN",
            },
            name: "Library",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "2NWToib9ZXhDXdkauxrofz",
        },
        name: "Sass",
        category: {
            sys: {
                id: "LpaqJMbOWdmZPHkbKwqhV",
            },
            name: "Language",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "1WwXYlsV5GVsXp18GQJdpH",
        },
        name: "Javascript",
        category: {
            sys: {
                id: "LpaqJMbOWdmZPHkbKwqhV",
            },
            name: "Language",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "3OaHV910ZNEE62BEzqnJhT",
        },
        name: "Mockito",
        category: {
            sys: {
                id: "3gocfo5cHx1eoxPeGK0TZN",
            },
            name: "Library",
        },
        area: {
            sys: {
                id: "46D0YFmV23VnFGYkOadxB3",
            },
            name: "Back End",
        },
    },
    {
        sys: {
            id: "Zty7ecPbwXyJEcBYX5jA9",
        },
        name: "Typescript",
        category: {
            sys: {
                id: "LpaqJMbOWdmZPHkbKwqhV",
            },
            name: "Language",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "2cVX60DOl3l46jkUg0yPJ2",
        },
        name: "React",
        category: {
            sys: {
                id: "7J5SZl9YHpqDBOSDyJCh4k",
            },
            name: "Framework",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "1ClpNWj7rtxHe27WlF1LJb",
        },
        name: "Mob-x",
        category: {
            sys: {
                id: "3gocfo5cHx1eoxPeGK0TZN",
            },
            name: "Library",
        },
        area: {
            sys: {
                id: "5cam5BGhsGLR3NJoTtt7wj",
            },
            name: "Front End",
        },
    },
    {
        sys: {
            id: "4uzrPKBo1965JMAnAEzP4d",
        },
        name: "Java",
        category: {
            sys: {
                id: "LpaqJMbOWdmZPHkbKwqhV",
            },
            name: "Language",
        },
        area: {
            sys: {
                id: "46D0YFmV23VnFGYkOadxB3",
            },
            name: "Back End",
        },
    },
    {
        sys: {
            id: "5hZTYfM0XRirQFsineKALf",
        },
        name: "Spring Boot",
        category: {
            sys: {
                id: "7J5SZl9YHpqDBOSDyJCh4k",
            },
            name: "Framework",
        },
        area: {
            sys: {
                id: "46D0YFmV23VnFGYkOadxB3",
            },
            name: "Back End",
        },
    },
    {
        sys: {
            id: "jdyzEE2HdkTs5DaCIr9MP",
        },
        name: "Hibernate",
        category: {
            sys: {
                id: "3gocfo5cHx1eoxPeGK0TZN",
            },
            name: "Library",
        },
        area: {
            sys: {
                id: "46D0YFmV23VnFGYkOadxB3",
            },
            name: "Back End",
        },
    },
    {
        sys: {
            id: "5ozU5AqiMgmnG2S3sSW6Qa",
        },
        name: "JUnit",
        category: {
            sys: {
                id: "3gocfo5cHx1eoxPeGK0TZN",
            },
            name: "Library",
        },
        area: {
            sys: {
                id: "46D0YFmV23VnFGYkOadxB3",
            },
            name: "Back End",
        },
    },
];
