"use client";

import Link from "next/link";

import {
    Heart
} from "lucide-react";

import {
    useState
} from "react";

import {
    useUser
} from "@clerk/nextjs";

import {
    useSaved
} from "@/context/SavedContext";

import {
    saveCollege,
    removeSavedCollege
} from "@/services/savedService";

import {
    addToCompare
} from "@/utils/compare";

import { College } from "@/types/college";

interface Props {
    college: College;
}

export default function CollegeCard({
    college
}: Props) {

    const {
        savedIds,
        refreshSaved
    } = useSaved();

    const saved =
        savedIds.includes(college.id);

    const { user } = useUser();

    const [
        showAuthAlert,
        setShowAuthAlert
    ] = useState(false);

    const handleSave = async (
        e: React.MouseEvent
    ) => {

        e.preventDefault();

        if (!user) {

            setShowAuthAlert(true);

            setTimeout(() => {
                setShowAuthAlert(false);
            }, 1600);

            return;
        }

        if (saved) {

            await removeSavedCollege(
                user.id,
                college.id
            );

        } else {

            await saveCollege(
                user.id,
                college.id
            );
        }

        await refreshSaved();
    };

    const handleCompare = (
        e: React.MouseEvent
    ) => {

        e.preventDefault();

        addToCompare({
            id: college.id,
            name: college.name
        });

        window.dispatchEvent(
            new Event("compareUpdated")
        );
    };

    return (

        <>
            {showAuthAlert && (

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#171b22]/95 backdrop-blur-xl border border-red-500 text-red-400 px-5 py-3 rounded-2xl text-sm shadow-2xl">

                    Sign in to save colleges

                </div>

            )}

            <div className="flex flex-col h-full">

                {/* CARD */}

                <Link
                    href={`/college/${college.id}`}
                    className="flex-1"
                >

                    <div className="bg-[#161b22] border border-[#262c36] rounded-2xl overflow-hidden hover:border-[#3b4452] transition duration-300 h-full flex flex-col">

                        {/* IMAGE */}

                        <div className="h-48 bg-[#11151b] flex items-center justify-center overflow-hidden">

                            <img
                                src={college.image_url}
                                alt={college.name}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        {/* CONTENT */}

                        <div className="p-5 flex flex-col flex-1">

                            {/* TOP */}

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex-1">

                                    <h2 className="text-xl font-semibold text-white leading-snug min-h-[72px]">

                                        {college.name}

                                    </h2>

                                    <p className="text-gray-400 text-sm mt-3">

                                        {college.location}

                                    </p>

                                </div>

                                <div className="shrink-0 bg-[#222833] border border-[#303846] rounded-xl px-3 py-2 text-sm text-white">

                                    {college.rating} ★

                                </div>

                            </div>

                            {/* STATS */}

                            <div className="grid grid-cols-2 gap-6 mt-8">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Avg Package
                                    </p>

                                    <p className="text-xl font-semibold text-white mt-2">

                                        ₹{college.avg_package.toLocaleString()}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Fees
                                    </p>

                                    <p className="text-xl font-semibold text-white mt-2">

                                        ₹{college.fees.toLocaleString()}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </Link>

                {/* ACTIONS */}

                <div className="flex gap-3 mt-4">

                    <button
                        onClick={handleSave}
                        className={`
                            flex-1
                            rounded-xl
                            py-3
                            text-sm
                            border
                            transition
                            flex
                            items-center
                            justify-center
                            gap-2

                            ${saved
                                ? "border-red-500/40 text-red-400 bg-red-500/5"
                                : "border-[#262c36] text-gray-300 hover:border-[#3a4455]"
                            }
                        `}
                    >

                        <Heart
                            size={16}
                            className={
                                saved
                                    ? "fill-red-500"
                                    : ""
                            }
                        />

                        {saved
                            ? "Saved"
                            : "Save"}

                    </button>

                    <button
                        onClick={handleCompare}
                        className="flex-1 rounded-xl py-3 text-sm bg-[#222833] hover:bg-[#2b3442] transition border border-[#303846] text-gray-300"
                    >

                        Compare

                    </button>

                </div>

            </div>

        </>
    );
}