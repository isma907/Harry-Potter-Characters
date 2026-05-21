import { useQuery } from "@tanstack/react-query";
import { fetchCharacter, fetchCharacters } from "@lib/api/characters";
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


interface UseCharacterOptions {
  characterId?: string | null;
  initialData?: Character | null;
}

export const useCharacter = ({
  characterId,
  initialData,
}: UseCharacterOptions) => {
  const { data, ...rest } = useQuery<Character | null>({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId!),
    enabled: Boolean(characterId),
    initialData,
    staleTime: Infinity,
    refetchOnMount: false,
  });

  return {
    character: data ?? null,
    ...rest,
  };
};