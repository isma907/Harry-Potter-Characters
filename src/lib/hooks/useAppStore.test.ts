import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({
      preferredHouse: undefined,
    });
  });

  describe("setPreferredHouse", () => {
    it("sets a specific house", () => {
      useAppStore.getState().setPreferredHouse("Gryffindor");
      expect(useAppStore.getState().preferredHouse).toBe("Gryffindor");
    });

    it("sets null to show all characters", () => {
      useAppStore.getState().setPreferredHouse(null);
      expect(useAppStore.getState().preferredHouse).toBeNull();
    });

    it("sets undefined to trigger house selection", () => {
      useAppStore.getState().setPreferredHouse("Slytherin");
      useAppStore.getState().setPreferredHouse(undefined);
      expect(useAppStore.getState().preferredHouse).toBeUndefined();
    });
  });

  describe("toggleFavorite", () => {
    beforeEach(() => {
      useAppStore.setState({ favorites: [] });
    });

    it("adds an id to favorites", () => {
      useAppStore.getState().toggleFavorite("abc");
      expect(useAppStore.getState().favorites).toContain("abc");
    });

    it("removes an existing id from favorites", () => {
      useAppStore.setState({ favorites: ["abc"] });
      useAppStore.getState().toggleFavorite("abc");
      expect(useAppStore.getState().favorites).not.toContain("abc");
    });

    it("toggles correctly when called twice", () => {
      useAppStore.getState().toggleFavorite("xyz");
      expect(useAppStore.getState().favorites).toContain("xyz");
      useAppStore.getState().toggleFavorite("xyz");
      expect(useAppStore.getState().favorites).not.toContain("xyz");
    });
  });
});
