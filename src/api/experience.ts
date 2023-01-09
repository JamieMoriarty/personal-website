import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { Document as ContentfulDocument } from "@contentful/rich-text-types";
import { isArray, isShape, isString, maybeNull } from "../utils/validations";
import { hasId } from ".";

export const EXPERIENCE_QUERY = gql(`query GetExperience {
    positionCollection {
        items {
        sys {
            id
        }
        title
        team
        additionalSpecifier
        startDate
        endDate
        keyResponsibilities
        description {
            json
        }
        employer {
            sys {
            id
            }
            name
            logo {
            url
            }
            hompageUrl
        }
        skillsCollection {
            items {
            sys {
                id
            }
            }
        }
        
        }
    }
}`);

export const useApiExperience = function (): Array<ExperienceApiResponse> | undefined {
    const { data, loading, error } = useQuery(EXPERIENCE_QUERY);

    if (error !== undefined) {
        throw error;
    } else if (loading) {
        return undefined;
    } else if (data?.positionCollection?.items === undefined) {
        throw Error("data was unexpectedly undefined");
    } else if (!isExperienceApiResponse(data.positionCollection.items)) {
        throw Error("unexpected shape of data");
    } else {
        return data.positionCollection.items;
    }
};

interface ExperienceApiResponse {
    title: string;
    team: string;
    additionalSpecifier: string | null;
    startDate: string;
    endDate: string | null;
    keyResponsibilities: Array<string>;
    sys: { id: string };
    description: { json: ContentfulDocument } | null;
    employer: {
        name: string;
        hompageUrl: string | null;
        sys: { id: string };
        logo: { url: string };
    };
    skillsCollection: {
        items: Array<{
            sys: { id: string };
        }>;
    };
}

interface EmployerApiResponse {
    name: string;
    hompageUrl: string | null;
    sys: { id: string };
    logo: { url: string };
}

const isEmployer = isShape<EmployerApiResponse>({
    name: isString,
    hompageUrl: maybeNull(isString),
    sys: hasId,
    logo: isShape({ url: isString }),
});

const isSkill = isShape({
    sys: hasId,
});

const isExperienceApiResponse = isArray(
    isShape<ExperienceApiResponse>({
        title: isString,
        team: isString,
        additionalSpecifier: maybeNull(isString),
        startDate: isString,
        endDate: maybeNull(isString),
        keyResponsibilities: isArray(isString),
        sys: hasId,
        description: maybeNull(isShape({ json: isContentfulDocument })),
        employer: isEmployer,
        skillsCollection: isShape({ items: isArray(isSkill) }),
    })
);

function isContentfulDocument(value: unknown): value is ContentfulDocument {
    return (
        !!value &&
        typeof value === "object" &&
        "nodeType" in value &&
        value["nodeType"] === "document"
    );
}
