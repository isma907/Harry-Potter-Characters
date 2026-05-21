import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@lib/api/characters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { Character } from "@lib/constants/characters";

export const useCharacters = () => {
  const { preferredHouse } = useAppStore();
  const { data, ...rest } = useQuery<Character[]>({
    queryKey: ["characters", preferredHouse ?? "all"],
    /*
    first issue
    - Bug: character list did not refresh when changing house selection.
      Root cause: React Query key was not normalized for preferredHouse values, causing inconsistent cache behavior between `undefined` and `null` states.
    */
    queryFn: () => fetchCharacters(preferredHouse),
    staleTime: Infinity,
  });

  const characters = data?.filter((character) => character.image) || [];

  return {
    characters,
    ...rest,
  };
};
