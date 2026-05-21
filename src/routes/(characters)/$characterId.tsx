import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { fetchCharacter } from '@lib/api/characters'
import { useQuery } from '@tanstack/react-query'
import { Character } from '@lib/constants/characters'

export const Route = createFileRoute('/(characters)/$characterId')({
    loader: async ({ params: { characterId }, context }) => {
        if (!characterId) {
            return { character: null, characterId: null }
        }

        const character = await context.queryClient.fetchQuery({
            queryKey: ['character', characterId],
            queryFn: () => fetchCharacter(characterId),
        })

        return { character, characterId }
    },
    component: RouteComponent,
})

function renderCharacterProp(label: string, value?: string | number | boolean | null) {
    return (
        <div className="grid gap-1">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-300/80">{label}</span>
            <span className="text-sm text-slate-100">{value ?? "Unknown"}</span>
        </div>
    )
}

function RouteComponent() {
    const router = useRouter()
    const { character: initialCharacter, characterId } = Route.useLoaderData()

    const { data: character } = useQuery<Character | null>({
        queryKey: ['character', characterId],
        queryFn: () => fetchCharacter(characterId as string),
        initialData: initialCharacter ?? undefined,
        enabled: !!characterId,
    })

    if (!character) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                <p className="text-sm text-amber-300">404</p>
                <h1 className="mt-2 text-2xl font-semibold">
                    Character not found
                </h1>
                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.history.back()}
                        className="rounded bg-amber-500 px-4 py-2 text-slate-950 hover:bg-amber-400"
                    >
                        Go back
                    </button>
                    <Link
                        to="/"
                        className="rounded border border-amber-500 px-4 py-2 text-amber-300 hover:bg-amber-500/10"
                    >
                        Home
                    </Link>
                </div>
            </div>
        )
    }

    const displayYesNo = (value?: boolean) => {
        if (value === true) return 'Yes'
        if (value === false) return 'No'
        return 'Unknown'
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
                <img
                    src={character.image || undefined}
                    alt={character.name}
                    className="w-full rounded-lg object-cover"
                />

                <div className="space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-amber-300">Character details</p>
                            <h1 className="text-3xl font-semibold">{character.name}</h1>
                            <p className="text-sm text-slate-400">
                                {character.house ?? 'No house assigned'}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.history.back()}
                            className="rounded border px-3 py-2 text-sm hover:bg-slate-800"
                        >
                            Back
                        </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Portrayed by', character.actor)}
                        {renderCharacterProp(
                            'Alternate actors',
                            character.alternate_actors?.join(', ') || null
                        )}
                    </div>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Basic Information</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {renderCharacterProp('Species', character.species)}
                            {renderCharacterProp('Gender', character.gender)}
                            {renderCharacterProp('Date of birth', character.dateOfBirth)}
                            {renderCharacterProp('Ancestry', character.ancestry)}
                            {renderCharacterProp('Eye colour', character.eyeColour)}
                            {renderCharacterProp('Hair colour', character.hairColour)}
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Magical Information</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {renderCharacterProp('Wizard / witch', displayYesNo(character.wizard))}
                            {renderCharacterProp('Patronus', character.patronus)}
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-semibold">Hogwarts</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {renderCharacterProp('Student', displayYesNo(character.hogwartsStudent))}
                            {renderCharacterProp('Staff', displayYesNo(character.hogwartsStaff))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
