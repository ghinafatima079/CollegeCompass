"use client";

import { useEffect, useState } from "react";

import {
    Heart,
    Trash2
} from "lucide-react";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import {
    getCompareColleges,
    clearCompare,
    removeFromCompare
} from "@/utils/compare";

import {
    getCollegeById
} from "@/services/collegeService";

import { College } from "@/types/college";

import {
    useSaved
} from "@/context/SavedContext";

import {
    useUser
} from "@clerk/nextjs";

import {
    saveCollege,
    removeSavedCollege
} from "@/services/savedService";

export default function ComparePage() {

    const [colleges, setColleges] =
        useState<College[]>([]);

    const {
        savedIds,
        refreshSaved
    } = useSaved();

    const { user } = useUser();

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {

        const selected =
            getCompareColleges();

        const data = await Promise.all(

            selected.map((college) =>
                getCollegeById(
                    String(college.id)
                )
            )

        );

        setColleges(data);
    };

    const handleRemove = (
        id: number
    ) => {

        removeFromCompare(id);

        const updated =
            colleges.filter(
                (college) =>
                    college.id !== id
            );

        setColleges(updated);

        window.dispatchEvent(
            new Event("compareUpdated")
        );
    };

    const handleClear = () => {

        clearCompare();

        setColleges([]);

        window.dispatchEvent(
            new Event("compareUpdated")
        );
    };

    const handleSave = async (
        college: College
    ) => {

        if (!user) return;

        const saved =
            savedIds.includes(college.id);

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

    return (

        <main className="min-h-screen bg-[#0b0d12] text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#171b22] pb-10">

                    <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
                            Comparison
                        </p>

                        <h1 className="text-3xl md:text-5xl font-medium mt-4 tracking-tight">
                            Compare Colleges
                        </h1>

                        <p className="text-gray-500 mt-4 max-w-2xl leading-relaxed text-sm md:text-base">
                            Compare placements, academics, fees and opportunities across institutions.
                        </p>

                    </div>

                    {colleges.length > 0 && (

                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-500 hover:text-red-400 transition"
                        >
                            Clear all
                        </button>

                    )}

                </div>

                {/* EMPTY */}

                {colleges.length === 0 && (

                    <div className="py-32 text-center">

                        <h2 className="text-2xl md:text-3xl font-medium">
                            No colleges selected
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Add colleges from Explore or Details page.
                        </p>

                    </div>

                )}

                {/* MOBILE */}

                {colleges.length > 0 && (

                    <div className="lg:hidden mt-10 space-y-8">

                        {colleges.map((college) => {

                            const saved =
                                savedIds.includes(
                                    college.id
                                );

                            return (

                                <div
                                    key={college.id}
                                    className="border border-[#1c212b] rounded-3xl overflow-hidden bg-[#11151b]"
                                >

                                    <div className="h-52 bg-[#151922]">

                                        <img
                                            src={college.image_url}
                                            alt={college.name}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                    <div className="p-6">

                                        <div className="flex items-start justify-between gap-4">

                                            <Link
                                                href={`/college/${college.id}`}
                                                className="block hover:opacity-90 transition"
                                            >

                                                <div>

                                                    <h2 className="text-2xl font-semibold leading-tight">

                                                        {college.name}

                                                    </h2>

                                                    <p className="text-gray-500 mt-3">

                                                        {college.location}

                                                    </p>

                                                </div>

                                            </Link>

                                            <div className="text-sm bg-[#1b2130] border border-[#2b3442] rounded-xl px-3 py-2">

                                                ★ {college.rating}

                                            </div>

                                        </div>

                                        {/* STATS */}

                                        <div className="mt-8 space-y-6">

                                            <MobileStat
                                                label="Placements"
                                                value={`${college.placements_percentage}%`}
                                            />

                                            <MobileStat
                                                label="Average Package"
                                                value={`₹${college.avg_package.toLocaleString()}`}
                                            />

                                            <MobileStat
                                                label="Fees"
                                                value={`₹${college.fees.toLocaleString()}`}
                                            />

                                        </div>

                                        {/* COURSES */}

                                        <div className="mt-8">

                                            <p className="text-xs uppercase tracking-[0.15em] text-gray-600 mb-4">

                                                Courses

                                            </p>

                                            <div className="space-y-3">

                                                {college.courses.map((course) => (

                                                    <div
                                                        key={course.id}
                                                        className="text-gray-300 border-l border-[#2a313d] pl-4"
                                                    >

                                                        {course.name}

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                        {/* ACTIONS */}

                                        <div className="flex items-center gap-5 mt-10 text-sm">

                                            <button
                                                onClick={() =>
                                                    handleSave(college)
                                                }
                                                className={`
                                                    flex items-center gap-2 transition

                                                    ${saved
                                                        ? "text-red-400"
                                                        : "text-gray-500 hover:text-white"
                                                    }
                                                `}
                                            >

                                                <Heart
                                                    size={15}
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
                                                onClick={() =>
                                                    handleRemove(
                                                        college.id
                                                    )
                                                }
                                                className="flex items-center gap-2 text-gray-600 hover:text-red-400 transition"
                                            >

                                                <Trash2 size={15} />

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            );
                        })}

                    </div>

                )}

                {/* DESKTOP */}

                {colleges.length > 0 && (

                    <div className="hidden lg:block mt-16 overflow-x-auto">

                        {/* TOP */}

                        <div
                            className="grid gap-10 pb-14 border-b border-[#171b22]"
                            style={{
                                gridTemplateColumns:
                                    `180px repeat(${colleges.length}, minmax(260px, 1fr))`
                            }}
                        >

                            <div />

                            {colleges.map((college) => {

                                const saved =
                                    savedIds.includes(
                                        college.id
                                    );

                                return (

                                    <div
                                        key={college.id}
                                        className="min-w-[260px]"
                                    >

                                        <Link
                                            href={`/college/${college.id}`}
                                            className="block hover:opacity-90 transition"
                                        >

                                            <img
                                                src={college.image_url}
                                                alt={college.name}
                                                className="w-16 h-16 object-contain"
                                            />

                                            <h2 className="text-2xl font-medium leading-tight mt-6">

                                                {college.name}

                                            </h2>

                                            <p className="text-gray-500 mt-3">

                                                {college.location}

                                            </p>

                                        </Link>

                                        <div className="flex items-center gap-5 mt-8 text-sm">

                                            <button
                                                onClick={() =>
                                                    handleSave(college)
                                                }
                                                className={`
                                                    flex items-center gap-2 transition

                                                    ${saved
                                                        ? "text-red-400"
                                                        : "text-gray-500 hover:text-white"
                                                    }
                                                `}
                                            >

                                                <Heart
                                                    size={15}
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
                                                onClick={() =>
                                                    handleRemove(
                                                        college.id
                                                    )
                                                }
                                                className="flex items-center gap-2 text-gray-600 hover:text-red-400 transition"
                                            >

                                                <Trash2 size={15} />

                                                Remove

                                            </button>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                        {/* ROWS */}

                        <div className="mt-6">

                            <ComparisonRow
                                title="Rating"
                                values={
                                    colleges.map(
                                        (college) =>
                                            `★ ${college.rating}`
                                    )
                                }
                            />

                            <ComparisonRow
                                title="Placements"
                                values={
                                    colleges.map(
                                        (college) =>
                                            `${college.placements_percentage}%`
                                    )
                                }
                            />

                            <ComparisonRow
                                title="Average Package"
                                values={
                                    colleges.map(
                                        (college) =>
                                            `₹${college.avg_package.toLocaleString()}`
                                    )
                                }
                            />

                            <ComparisonRow
                                title="Fees"
                                values={
                                    colleges.map(
                                        (college) =>
                                            `₹${college.fees.toLocaleString()}`
                                    )
                                }
                            />

                            {/* COURSES */}

                            <div
                                className="grid gap-10 py-10 border-b border-[#171b22]"
                                style={{
                                    gridTemplateColumns:
                                        `180px repeat(${colleges.length}, minmax(260px, 1fr))`
                                }}
                            >

                                <div className="text-xs uppercase tracking-[0.15em] text-gray-600 pt-2">

                                    Courses

                                </div>

                                {colleges.map((college) => (

                                    <div
                                        key={college.id}
                                        className="space-y-4"
                                    >

                                        {college.courses.map((course) => (

                                            <div
                                                key={course.id}
                                                className="text-gray-300 border-l border-[#232833] pl-4"
                                            >

                                                {course.name}

                                            </div>

                                        ))}

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </main>

    );
}

interface ComparisonRowProps {

    title: string;

    values: string[];
}

function ComparisonRow({
    title,
    values
}: ComparisonRowProps) {

    return (

        <div
            className="grid gap-10 py-8 border-b border-[#171b22]"
            style={{
                gridTemplateColumns:
                    `180px repeat(${values.length}, minmax(260px, 1fr))`
            }}
        >

            <div className="text-xs uppercase tracking-[0.15em] text-gray-600 pt-2">

                {title}

            </div>

            {values.map((value, index) => (

                <div key={index}>

                    <p className="text-2xl font-normal tracking-tight text-white">

                        {value}

                    </p>

                </div>

            ))}

        </div>

    );
}

function MobileStat({
    label,
    value
}: {
    label: string;
    value: string;
}) {

    return (

        <div className="flex items-center justify-between border-b border-[#1d222c] pb-4">

            <p className="text-gray-500 text-sm">

                {label}

            </p>

            <p className="text-white text-lg font-medium">

                {value}

            </p>

        </div>

    );
}