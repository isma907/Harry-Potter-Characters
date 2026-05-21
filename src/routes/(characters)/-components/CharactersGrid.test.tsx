import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../-hooks/useCharacters", () => ({
    useCharacters: vi.fn(),
}));
vi.mock("../index", () => ({
    Route: {
        useSearch: vi.fn(() => ({ filter: "all" })),
    },
}));
vi.mock("@lib/hooks/useAppStore", () => ({
    useAppStore: vi.fn((selector: any) => selector({ favorites: [] })),
}));
vi.mock("./CharacterCard", () => ({
    CharacterCard: ({ character }: { character: { name: string } }) => (
        <div>{character.name}</div>
    ),
}));
vi.mock("@tanstack/react-router", async () => {
    const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
        "@tanstack/react-router"
    );
    return {
        ...actual,
        Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    };
});

import { CharactersGrid } from "./CharactersGrid";
import { Route } from "../index";
import { useCharacters } from "../-hooks/useCharacters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { mockCharacters } from "../../../test/mocks";



describe("CharactersGrid filter", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useCharacters).mockReturnValue({
            characters: mockCharacters,
            isLoading: false,
            isError: false,
        } as any);
    });

    it("renders all characters when filter is all", () => {
        vi.mocked(Route.useSearch).mockReturnValue({ filter: "all" });
        vi.mocked(useAppStore).mockImplementation((selector: any) => selector({ favorites: [] }));

        render(<CharactersGrid />);
        expect(screen.getByText("Harry Potter")).toBeInTheDocument();
        expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
        expect(screen.getByText("Minerva McGonagall")).toBeInTheDocument();
    });

    it("renders only students when filter is students", () => {
        vi.mocked(Route.useSearch).mockReturnValue({ filter: "students" });
        vi.mocked(useAppStore).mockImplementation((selector: any) => selector({ favorites: [] }));

        render(<CharactersGrid />);

        expect(screen.getByText("Harry Potter")).toBeInTheDocument();
        expect(screen.getByText("Hermione Granger")).toBeInTheDocument();
        expect(screen.queryByText("Minerva McGonagall")).not.toBeInTheDocument();
    });

    it("renders only favorite characters when filter is favorite", () => {
        vi.mocked(Route.useSearch).mockReturnValue({ filter: "favorite" });
        vi.mocked(useAppStore).mockImplementation((selector: any) => selector({ favorites: [mockCharacters[0].id] }));

        render(<CharactersGrid />);

        expect(screen.getByText("Harry Potter")).toBeInTheDocument();
        expect(screen.queryByText("Hermione Granger")).not.toBeInTheDocument();
        expect(screen.queryByText("Minerva McGonagall")).not.toBeInTheDocument();
    });
});
