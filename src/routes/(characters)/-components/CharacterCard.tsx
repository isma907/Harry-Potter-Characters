import { cn } from "@lib/utils";
import { Character } from "@lib/constants/characters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { Star } from "lucide-react";

type CharacterCardProps = {
  character: Character;
  className?: string;
};

export const CharacterCard = ({ character, className }: CharacterCardProps) => {

  const favorites = useAppStore((state) => state.favorites || []);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(character.id);


  return (
    <article
      className={cn(
        "relative isolate flex h-87.5 flex-col justify-end overflow-hidden rounded-[20px] px-3 py-6 shadow-md shadow-zinc-950",
        className
      )}
    >

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(character.id);
        }}
        className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center  cursor-pointer"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          size={24}
          className={cn(
            "transition-all duration-300",
            isFavorite ? "fill-amber-500 text-amber-500 scale-110" : "text-favorite"
          )}
        />
      </button>

      <img
        src={character.image || undefined}
        alt={character.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-stone-900/20"></div>
      <h3 className="z-10 font-light tracking-wide">{character.name}</h3>
    </article>
  );
};
