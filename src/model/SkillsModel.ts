import { useApiSkills } from "../api/skills";

export const useSkills = function () {
  const { data: rawData, loading, error } = useApiSkills();
  const dataItems = rawData?.skillCollection?.items
    .map((item) =>
      item
        ? {
            id: item.sys.id,
            name: item.name,
            category: {
              id: item.category?.sys.id,
              name: item.category?.name,
            },
            area: {
              id: item.area?.sys.id,
              name: item.area?.name,
            },
          }
        : item
    )
    .filter((item) => !!item);

  return {
    data: dataItems,
    loading,
    error,
  };
};
