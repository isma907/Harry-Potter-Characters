import { createFileRoute, Link } from '@tanstack/react-router'
import { CharacterCard } from './-components/CharacterCard'
import { Spinner } from '@lib/components/Spinner'
import { formatDate } from '@lib/utils'
import { useCharacter } from './-hooks/useCharacters'
import { fetchCharacter } from '@lib/api/characters'
import { InfoSection } from '@lib/components/InfoSection'

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
        <div className="container mx-auto py-15 max-w-[824px] mt-[25px]">
            <div className="grid gap-[18px] lg:grid-cols-[262px_1fr]">
                <CharacterCard character={character} />

                <div className="bg-character-card rounded-[20px] p-6 gap-[18px] flex flex-col">
                    <InfoSection
                        icon={<img src="/icons/user.png" alt="Basic Information" />}
                        title="Basic Information"
                    >
                        <InfoSection.Grid>
                            <InfoSection.Item label="Species" value={character.species || 'Unknown'} />
                            <InfoSection.Item label="Gender" value={character.gender || 'Unknown'} />
                            <InfoSection.Item label="Date of birth" value={formatDate(character.dateOfBirth)} />
                            <InfoSection.Item label="Ancestry" value={character.ancestry || 'Unknown'} />
                            <InfoSection.Item label="Eye colour" value={character.eyeColour || 'Unknown'} />
                            <InfoSection.Item label="Hair color" value={character.hairColour || 'Unknown'} />
                        </InfoSection.Grid>
                    </InfoSection>

                    <InfoSection.Divider />

                    <InfoSection
                        icon={<img src="/icons/sparkles.png" alt="Magical Information" />}
                        title="Magical Information"
                    >
                        <InfoSection.Grid>
                            <InfoSection.Item label="Wizard/witch" value={displayYesNo(character.wizard)} />
                            <InfoSection.Item label="Patronus" value={character.patronus || 'Unknown'} />
                        </InfoSection.Grid>
                    </InfoSection>

                    <InfoSection.Divider />

                    <InfoSection
                        icon={<img src="/icons/place-of-worship.png" alt="Hogwarts" />}
                        title="Hogwarts"
                    >
                        <InfoSection.Grid>
                            <InfoSection.Item label="Student" value={displayYesNo(character.hogwartsStudent)} />
                            <InfoSection.Item label="Staff" value={displayYesNo(character.hogwartsStaff)} />
                        </InfoSection.Grid>
                    </InfoSection>

                    <InfoSection.Divider />

                    <InfoSection
                        icon={<img src="/icons/book-open.png" alt="Portrayed by" />}
                        title="Portrayed by"
                    >
                        <InfoSection.Grid>
                            <InfoSection.Item label="Actor" value={character.actor || 'Unknown'} />

                            {character.alternate_actors && character.alternate_actors.length > 0 && (
                                <InfoSection.Item
                                    label="Alternate actors"
                                    value={character.alternate_actors.join(', ')}
                                />
                            )}
                        </InfoSection.Grid>
                    </InfoSection>
                </div>
            </div>
        </div>
    )
}
