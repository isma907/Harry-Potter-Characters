export const characterFilters = ["students", "staff", "favorite"] as const;

export type CharacterFilterType = (typeof characterFilters)[number];



export enum CharacterFilter {
    ALL = "all",
    STUDENTS = "students",
    STAFF = "staff",
    FAVORITE = "favorite"
};

export const filterOptions: ReadonlyArray<{
    value: CharacterFilter;
    label: string;
}> = [
        { value: CharacterFilter.ALL, label: "All Characters" },
        { value: CharacterFilter.STUDENTS, label: "Students" },
        { value: CharacterFilter.STAFF, label: "Staff" },
        { value: CharacterFilter.FAVORITE, label: "Favorites" },
    ];