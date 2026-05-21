import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HouseType } from "@lib/constants/houses";

interface AppState {
  preferredHouse: HouseType | null | undefined;
  setPreferredHouse: (house: HouseType | null | undefined) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        preferredHouse: undefined,
        setPreferredHouse: (preferredHouse) => set(() => ({ preferredHouse })),
        favorites: [],
        toggleFavorite: (id) =>
          set((state) => {
            const isFavorite = (state.favorites || []).includes(id);
            const currentFavorites = state.favorites || [];
            return {
              favorites: isFavorite
                ? currentFavorites.filter((favId) => favId !== id)
                : [...currentFavorites, id],
            };
          })
      }
      ),
      {
        name: "the-harry-potter-app-storage",
      }
    )
  )
);
