import { GetExperienceQuery } from "../../__generated__/graphql";
import { Position } from "./ExperienceModel";

export function toPositions(
    apiResponse: GetExperienceQuery
): Array<Omit<Position, "employer">> {
    const mappedData: Array<Omit<Position, "employer">> | undefined =
        apiResponse.positionCollection?.items.map((item) => {
            if (
                !item ||
                !item.title ||
                !item.team ||
                !item.startDate ||
                !item.keyResponsibilities ||
                item.keyResponsibilities.some((respons) => respons === null) ||
                !item.description ||
                !item.employer
            ) {
                throw Error(
                    "At least one 'position' in API response did not conform to expectation"
                );
            }

            return {
                title: item.title,
                team: item.team,
                additionalSpecifier: item.additionalSpecifier ?? undefined,
                startDate: item.startDate,
                endDate: item.endDate,
                keyResponsibilities: item.keyResponsibilities as Array<string>,
                description: item.description,
            };
        });

    if (!mappedData) {
        throw Error("Could not parse 'position' info from API");
    }

    return mappedData;
}
