import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { fetchCharacter } from '@lib/api/characters'
import { useQuery } from '@tanstack/react-query'
import { Character } from '@lib/constants/characters'
import { CharacterCard } from './-components/CharacterCard'

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
        <div className="grid gap-2">
            <span className="text-character-item-label">{label}</span>
            <span className="text-character-item-description">{value ?? "Unknown"}</span>
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
        <div className="container mx-auto py-15 grid gap-[18px] max-w-[824px]">
            <div className="grid gap-6 lg:grid-cols-[262px_1fr]">
                <CharacterCard character={character} />

                <div className="bg-character-card rounded-[20px] p-6 gap-[18px] flex flex-col">
                    <div className="section-header">
                        <img src="./icons/user.png" alt="Basic Information" />
                        <h2 className="section-header-title">Basic Information</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Species', character.species)}
                        {renderCharacterProp('Gender', character.gender)}
                        {renderCharacterProp('Date of birth', character.dateOfBirth)}
                        {renderCharacterProp('Ancestry', character.ancestry)}
                        {renderCharacterProp('Eye colour', character.eyeColour)}
                        {renderCharacterProp('Hair color', character.hairColour)}
                    </div>


                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="./icons/sparkles.png" alt="Magical Information" />
                        <h2 className="section-header-title">Magical Information</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Wizard / witch', displayYesNo(character.wizard))}
                        {renderCharacterProp('Patronus', character.patronus)}
                    </div>

                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="./icons/place-of-worship.png" alt="Hogwarts" />
                        <h2 className="section-header-title">Hogwarts</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Student', displayYesNo(character.hogwartsStudent))}
                        {renderCharacterProp('Staff', displayYesNo(character.hogwartsStaff))}
                    </div>

                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="./icons/book-open.png" alt="Portrayed by" />
                        <h2 className="section-header-title">Portrayed by</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Actor', character.actor)}
                    </div>
                </div>
            </div>
        </div>
    )
}
