export interface SavedCollege {
    id: number;
    name: string;
}

const STORAGE_KEY = "saved_colleges";

export const getSavedColleges = (): SavedCollege[] => {

    if (typeof window === "undefined") {
        return [];
    }

    const stored = localStorage.getItem(
        STORAGE_KEY
    );

    return stored ? JSON.parse(stored) : [];
};

export const isCollegeSaved = (
    id: number
) => {

    const colleges =
        getSavedColleges();

    return colleges.some(
        (college) => college.id === id
    );
};

export const toggleSavedCollege = (
    college: SavedCollege
) => {

    const existing =
        getSavedColleges();

    const alreadySaved =
        existing.find(
            (item) => item.id === college.id
        );

    let updated;

    if (alreadySaved) {

        updated = existing.filter(
            (item) => item.id !== college.id
        );

    } else {

        updated = [
            ...existing,
            college
        ];
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );

    window.dispatchEvent(
        new Event("savedUpdated")
    );
};