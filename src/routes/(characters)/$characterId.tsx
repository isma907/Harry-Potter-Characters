import { createFileRoute, Link } from '@tanstack/react-router'
import { CharacterCard } from './-components/CharacterCard'
import { Spinner } from '@lib/components/Spinner'
import { formatDate } from '@lib/utils'
import { useCharacter } from './-hooks/useCharacters'
import { fetchCharacter } from '@lib/api/characters'

export const Route = createFileRoute('/(characters)/$characterId')({
    pendingComponent: () => (
        <LoaderCharacterPage />
    ),
    loader: async ({ params: { characterId }, context }) => {
        if (!characterId) {
            return { character: null, characterId: null }
        }

        const character = await context.queryClient.fetchQuery({
            queryKey: ['character', characterId],
            queryFn: () => fetchCharacter(characterId),
            staleTime: Infinity,
        })

        return { character, characterId }
    },
    component: RouteComponent,
})


function LoaderCharacterPage() {
    return (<div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
    </div>)
}

function renderCharacterProp(label: string, value?: string | number | boolean | null) {
    return (
        <div className="grid gap-2">
            <span className="text-character-item-label">{label}</span>
            <span className="text-character-item-description">{value || "Unknown"}</span>
        </div>
    )
}


export function RouteComponent() {
    const { character: initialCharacter, characterId } = Route.useLoaderData()

    const { character, isLoading } = useCharacter({
        characterId,
        initialData: initialCharacter ?? undefined,
    })

    if (isLoading) {
        return (
            <LoaderCharacterPage />
        )
    }

    if (!character) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                <p className="text-sm text-amber-300">404</p>
                <h1 className="mt-2 text-2xl font-semibold">
                    Character not found
                </h1>
                <div className="mt-6 flex gap-3">
                    <Link
                        to="/"
                        className="rounded bg-amber-500 px-4 py-2 text-slate-950 hover:bg-amber-400"
                    >
                        Go Home
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
        <div className="container mx-auto py-15 max-w-[824px]">
            <div className="grid gap-[18px] lg:grid-cols-[262px_1fr]">
                <CharacterCard character={character} />

                <div className="bg-character-card rounded-[20px] p-6 gap-[18px] flex flex-col">
                    <div className="section-header">
                        <img src="/icons/user.png" alt="Basic Information" />
                        <h2 className="section-header-title">Basic Information</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Species', character.species)}
                        {renderCharacterProp('Gender', character.gender)}
                        {renderCharacterProp('Date of birth', formatDate(character.dateOfBirth))}
                        {renderCharacterProp('Ancestry', character.ancestry)}
                        {renderCharacterProp('Eye colour', character.eyeColour)}
                        {renderCharacterProp('Hair color', character.hairColour)}
                    </div>


                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="/icons/sparkles.png" alt="Magical Information" />
                        <h2 className="section-header-title">Magical Information</h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Wizard / witch', displayYesNo(character.wizard))}
                        {renderCharacterProp('Patronus', character.patronus)}
                    </div>

                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="/icons/place-of-worship.png" alt="Hogwarts" />
                        <h2 className="section-header-title">Hogwarts</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Student', displayYesNo(character.hogwartsStudent))}
                        {renderCharacterProp('Staff', displayYesNo(character.hogwartsStaff))}
                    </div>

                    <div className="separator"></div>

                    <div className="section-header">
                        <img src="/icons/book-open.png" alt="Portrayed by" />
                        <h2 className="section-header-title">Portrayed by</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {renderCharacterProp('Actor', character.actor)}
                        {character.alternate_actors && character.alternate_actors.length > 0 &&
                            renderCharacterProp('Alternate actors', character.alternate_actors.join(', '))}
                    </div>
                </div>
            </div>
        </div>
    )
}
