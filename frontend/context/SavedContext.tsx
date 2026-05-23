"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { useUser } from "@clerk/nextjs";

import {
    getSavedColleges
} from "@/services/savedService";

interface SavedContextType {

    savedIds: number[];

    refreshSaved: () => Promise<void>;
}

const SavedContext =
    createContext<SavedContextType>({
        savedIds: [],
        refreshSaved: async () => { }
    });

export function SavedProvider({
    children
}: {
    children: React.ReactNode;
}) {

    const { user } = useUser();

    const [savedIds, setSavedIds] =
        useState<number[]>([]);

    const refreshSaved = async () => {

        if (!user) {

            setSavedIds([]);
            return;
        }

        const saved =
            await getSavedColleges(
                user.id
            );

        const ids = saved.map(
            (college: any) => college.id
        );

        setSavedIds(ids);
    };

    useEffect(() => {

        refreshSaved();

    }, [user]);

    return (

        <SavedContext.Provider
            value={{
                savedIds,
                refreshSaved
            }}
        >

            {children}

        </SavedContext.Provider>

    );
}

export const useSaved = () =>
    useContext(SavedContext);