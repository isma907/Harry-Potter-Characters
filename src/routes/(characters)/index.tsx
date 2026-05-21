import { createFileRoute } from "@tanstack/react-router";
import { CharactersGrid } from "./-components/CharactersGrid";
import { z } from "zod";

const characterSearchSchema = z.object({
  filter: z.enum(["all", "students", "staff", "favorite"]).optional().catch("all"),
});

export const Route = createFileRoute("/(characters)/")({
  validateSearch: characterSearchSchema,
  component: CharactersIndexView,
});

function CharactersIndexView() {
  return <CharactersGrid />;
}
