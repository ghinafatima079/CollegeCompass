export interface CompareCollege {
    id: number;
    name: string;
}

const STORAGE_KEY = "compare_colleges";

export const getCompareColleges = (): CompareCollege[] => {

    if (typeof window === "undefined") {
        return [];
    }

    const stored = localStorage.getItem(
        STORAGE_KEY
    );

    return stored ? JSON.parse(stored) : [];
};

export const addToCompare = (
    college: CompareCollege
) => {

    const existing = getCompareColleges();

    const alreadyExists = existing.find(
        (item) => item.id === college.id
    );

    if (alreadyExists) {
        return;
    }

    if (existing.length >= 3) {

        window.dispatchEvent(
            new CustomEvent(
                "compareLimitReached"
            )
        );

        return;
    }

    const updated = [...existing, college];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );
};

export const removeFromCompare = (
    id: number
) => {

    const existing = getCompareColleges();

    const updated = existing.filter(
        (college) => college.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
    );
};

export const clearCompare = () => {

    localStorage.removeItem(
        STORAGE_KEY
    );
};