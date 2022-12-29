import { useApiExperience } from "../api/experience";

export const useExperience = () => {
  const { data: rawData, loading, error } = useApiExperience();

  return { data: rawData, loading, error };
};
