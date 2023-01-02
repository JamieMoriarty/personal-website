import { useApiExperience } from "../../api/experience";
import { Scalars } from "../../__generated__/graphql";

export const useExperience = () => {
    const { data: rawData, loading } = useApiExperience();

    return {
        data: rawData,
        loading,
    };
};

export interface Position {
    title: string;
    team: string;
    additionalSpecifier?: string;
    startDate: Date;
    endDate?: Date;
    keyResponsibilities: Array<string>;
    description: Scalars["JSON"];
    employer: Employer;
}

export interface Employer {
    name: string;
    logo: string;
    homepageUrl?: string;
}
