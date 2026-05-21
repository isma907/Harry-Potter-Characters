import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockUseCharacter = vi.fn();

vi.mock("./(characters)/-hooks/useCharacters", () => ({
  useCharacter: (props: any) => mockUseCharacter(props),
}));

import { Route, RouteComponent } from "./(characters)/$characterId";

const hermione = {
  id: "4c7e6819-a91a-45b2-a454-f931e4a7cce3",
  name: "Hermione Granger",
  alternate_names: ["Hermy", "Know-it-all", "Miss Grant", "Herm-own-ninny"],
  species: "human",
  gender: "female",
  house: "Gryffindor",
  dateOfBirth: "19-09-1979",
  yearOfBirth: 1979,
  wizard: true,
  ancestry: "muggleborn",
  eyeColour: "brown",
  hairColour: "brown",
  wand: { wood: "vine", core: "dragon heartstring", length: 10.75 },
  patronus: "otter",
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: "Emma Watson",
  alternate_actors: [],
  alive: true,
  image: "https://ik.imagekit.io/hpapi/hermione.jpeg",
};

describe("Character detail page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Route as any, "useLoaderData").mockReturnValue({
      character: hermione,
      characterId: hermione.id,
    });
    mockUseCharacter.mockReturnValue({
      character: hermione,
      isLoading: false,
      isError: false,
    });
  });

  it("renders Hermione details from the page loader and hook", () => {
    render(<RouteComponent />);

    expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
    expect(screen.getByText("Emma Watson")).toBeInTheDocument();
    expect(screen.getByText("human")).toBeInTheDocument();
    expect(screen.getByText("otter")).toBeInTheDocument();
  });
});
