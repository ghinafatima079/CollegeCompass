"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";

import { useUser } from "@clerk/nextjs";

import {
    getSavedColleges,
    removeSavedCollege
} from "@/services/savedService";

import {
    getCollegeById
} from "@/services/collegeService";

import { useRouter } from "next/navigation";

import { College } from "@/types/college";

export default function SavedPage() {

    const { user } = useUser();

    const router = useRouter();

    const [colleges, setColleges] =
        useState<College[]>([]);

    useEffect(() => {

        if (user) {

            fetchSaved();

        } else {

            router.push("/sign-in");
        }

    }, [user]);

    const fetchSaved = async () => {

        if (!user) return;

        const data = await getSavedColleges(
            user.id
        );

        setColleges(data);
    };

    const handleRemove = async (
        collegeId: number
    ) => {

        if (!user) return;

        await removeSavedCollege(
            user.id,
            collegeId
        );

        setColleges((prev) =>
            prev.filter(
                (item) =>
                    item.id !== collegeId
            )
        );
    };

    return (

        <main className="min-h-screen bg-[#0b0d12] text-white">

            <Navbar />

            <div className="max-w-5xl mx-auto px-8 py-16">

                {/* HEADER */}

                <div className="border-b border-[#171b22] pb-10">

                    <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
                        Saved
                    </p>

                    <h1 className="text-4xl font-medium tracking-tight mt-4">
                        Saved Colleges
                    </h1>

                    <p className="text-gray-500 mt-4">
                        Your bookmarked colleges and institutions.
                    </p>

                </div>

                {/* EMPTY */}

                {colleges.length === 0 && (

                    <div className="py-32 text-center">

                        <h2 className="text-3xl font-medium">
                            Nothing saved yet
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Save colleges while exploring to view them here.
                        </p>

                    </div>

                )}

                {/* LIST */}

                {colleges.length > 0 && (

                    <div className="mt-10 divide-y divide-[#171b22]">

                        {colleges.map((college) => (

                            <div
                                key={college.id}
                                className="flex items-center justify-between gap-6 py-8 group"
                            >

                                {/* LEFT */}

                                <Link
                                    href={`/college/${college.id}`}
                                    className="flex items-center gap-5 flex-1 min-w-0"
                                >

                                    <img
                                        src={college.image_url}
                                        alt={college.name}
                                        className="w-14 h-14 object-contain opacity-90"
                                    />

                                    <div className="min-w-0">

                                        <h2 className="text-xl font-medium truncate group-hover:text-violet-400 transition">
                                            {college.name}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {college.location}
                                        </p>

                                    </div>

                                </Link>

                                {/* RIGHT */}

                                <button
                                    onClick={() =>
                                        handleRemove(college.id)
                                    }
                                    className="text-sm text-gray-600 hover:text-red-400 transition"
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>

    );
}