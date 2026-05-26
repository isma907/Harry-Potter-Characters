import { Spinner } from "@lib/components/Spinner";
import { CharacterCard } from "./CharacterCard";
import { useCharacters } from "../-hooks/useCharacters";
import { Link } from "@tanstack/react-router";
import { Route } from "../index";
import { useAppStore } from "@lib/hooks/useAppStore";
import { cn } from "@lib/utils";
import { CharacterFilter, filterOptions } from "@lib/constants/filters";

export const CharactersGrid = () => {
  const { characters, isLoading, isError } = useCharacters();
  const { filter = CharacterFilter.ALL } = Route.useSearch();
  const favorites = useAppStore((state) => state.favorites || []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg text-amber-200/60">Something went wrong while fetching characters.</p>
        <p className="text-sm text-amber-200/30">Please try again later.</p>
      </div>
    );
  }

  const filteredCharacters = characters.filter((character) => {
    if (filter === CharacterFilter.STUDENTS) return character.hogwartsStudent;
    if (filter === CharacterFilter.STAFF) return character.hogwartsStaff;
    if (filter === CharacterFilter.FAVORITE) return favorites.includes(character.id);
    return true;
  });


  return (
    <>
      <div className="flex justify-center py-[10px]">
        <div className="filter-wrapper flex p-1">
          {filterOptions.map((opt) => (
            <Link
              key={opt.value}
              to="/"
              search={{ filter: opt.value }}
              className={cn(
                "filter-option",
                filter === opt.value
                  ? "active-filter "
                  : "hover:text-amber-100"
              )}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {filteredCharacters.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <p className="text-lg text-amber-200/60">No characters found.</p>
          <p className="text-sm text-amber-200/30">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="characters-wrapper mx-auto grid grid-cols-[repeat(auto-fill,250px)] justify-center gap-4">
          {filteredCharacters.map((character) => (
            <Link
              key={character.id}
              to="/$characterId"
              params={{ characterId: character.id }}
            >
              <CharacterCard
                character={character}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
