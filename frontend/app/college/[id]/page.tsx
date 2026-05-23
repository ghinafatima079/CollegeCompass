"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Heart } from "lucide-react";

import Skeleton from "@/components/Skeleton";

import {
    addToCompare
} from "@/utils/compare";

import Navbar from "@/components/Navbar";

import {
    getCollegeById
} from "@/services/collegeService";

import { College } from "@/types/college";

import { useUser } from "@clerk/nextjs";

import {
    saveCollege,
    removeSavedCollege
} from "@/services/savedService";

import { useSaved } from "@/context/SavedContext";

export default function CollegeDetailPage() {

    const params = useParams();

    const [college, setCollege] =
        useState<College | null>(null);

    const { user } = useUser();

    const {
        savedIds,
        refreshSaved
    } = useSaved();

    const saved =
        college
            ? savedIds.includes(college.id)
            : false;

    useEffect(() => {
        fetchCollege();
    }, []);

    const fetchCollege = async () => {

        const data = await getCollegeById(
            params.id as string
        );

        setCollege(data);
    };

    const [showAuthAlert, setShowAuthAlert] =
        useState(false);

    const handleSave = async () => {

        if (!user || !college) {

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

    const handleCompare = () => {

        if (!college) return;

        addToCompare({
            id: college.id,
            name: college.name
        });

        window.dispatchEvent(
            new Event("compareUpdated")
        );
    };

    if (!college) {

        return (

            <main className="min-h-screen bg-[#0f1115] text-white">

                <Navbar />

                <div className="max-w-7xl mx-auto px-6 py-12">

                    <Skeleton className="w-full h-[260px] rounded-3xl" />

                    <div className="mt-10">

                        <Skeleton className="h-5 w-32" />

                        <Skeleton className="h-14 w-2/3 mt-6" />

                        <Skeleton className="h-5 w-48 mt-6" />

                        <div className="flex gap-4 mt-8">

                            <Skeleton className="h-12 w-36" />
                            <Skeleton className="h-12 w-36" />

                        </div>

                        <Skeleton className="h-28 w-full mt-10" />

                    </div>

                </div>

            </main>

        );
    }

    return (
        <main className="min-h-screen bg-[#0f1115] text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* HERO IMAGE */}

                <img
                    src={college.image_url}
                    alt={college.name}
                    className="w-full h-[260px] object-cover rounded-3xl border border-[#262c36]"
                />

                {/* HEADER */}

                <div className="flex flex-wrap gap-4 mt-8">

                    {showAuthAlert && (

                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#171b22]/95 backdrop-blur-xl border border-[#2a3140] text-gray-300 px-5 py-4 rounded-2xl text-sm shadow-2xl">

                            Sign in to save colleges

                        </div>

                    )}

                    <button
                        onClick={handleSave}
                        className="border border-[#262c36] hover:border-[#3a4455] transition px-5 py-3 rounded-xl text-sm text-gray-300 flex items-center gap-2"
                    >

                        <Heart
                            size={16}
                            className={
                                saved
                                    ? "fill-red-500 text-red-500"
                                    : ""
                            }
                        />

                        {saved
                            ? "Saved"
                            : "Save College"}

                    </button>

                    <button
                        onClick={handleCompare}
                        className="border border-[#262c36] hover:border-violet-500 transition px-5 py-3 rounded-xl text-sm text-gray-300"
                    >
                        Add to Compare
                    </button>

                </div>


                <div className="mt-10">

                    <p className="text-violet-400 text-sm font-medium mb-3">
                        COLLEGE DETAILS
                    </p>

                    <h1 className="text-5xl font-semibold tracking-tight leading-tight">
                        {college.name}
                    </h1>

                    <p className="text-gray-400 mt-4 text-lg">
                        {college.location}
                    </p>

                    {/* BADGES */}

                    <div className="flex flex-wrap gap-3 mt-6">

                        <div className="bg-[#161b22] border border-[#262c36] px-4 py-2 rounded-xl text-sm">
                            ⭐ {college.rating} Rating
                        </div>

                        <div className="bg-[#161b22] border border-[#262c36] px-4 py-2 rounded-xl text-sm">
                            {college.placements_percentage}% Placements
                        </div>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="text-gray-300 mt-8 max-w-4xl leading-relaxed text-lg">
                        {college.description}
                    </p>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

                    <div className="bg-[#161b22] border border-[#262c36] rounded-2xl p-6">

                        <p className="text-gray-400 text-sm">
                            Average Package
                        </p>

                        <h2 className="text-3xl font-semibold mt-3">
                            ₹{college.avg_package.toLocaleString()}
                        </h2>

                    </div>

                    <div className="bg-[#161b22] border border-[#262c36] rounded-2xl p-6">

                        <p className="text-gray-400 text-sm">
                            Fees
                        </p>

                        <h2 className="text-3xl font-semibold mt-3">
                            ₹{college.fees.toLocaleString()}
                        </h2>

                    </div>

                    <div className="bg-[#161b22] border border-[#262c36] rounded-2xl p-6">

                        <p className="text-gray-400 text-sm">
                            Placements
                        </p>

                        <h2 className="text-3xl font-semibold mt-3">
                            {college.placements_percentage}%
                        </h2>

                    </div>

                </div>

                {/* COURSES */}

                <div className="mt-20">

                    <p className="text-violet-400 text-sm font-medium mb-3">
                        COURSES
                    </p>

                    <h2 className="text-3xl font-semibold">
                        Programs Offered
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-8">

                        {college.courses.map((course) => (

                            <div
                                key={course.id}
                                className="bg-[#161b22] border border-[#262c36] px-5 py-3 rounded-xl text-gray-300"
                            >
                                {course.name}
                            </div>

                        ))}

                    </div>

                </div>

                {/* REVIEWS */}

                <div className="mt-20 mb-20">

                    <p className="text-violet-400 text-sm font-medium mb-3">
                        STUDENT REVIEWS
                    </p>

                    <h2 className="text-3xl font-semibold">
                        What students say
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                        {college.reviews.map((review) => (

                            <div
                                key={review.id}
                                className="bg-[#161b22] border border-[#262c36] rounded-2xl p-6"
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <p className="font-medium text-white">
                                        {review.author}
                                    </p>

                                    <p className="text-yellow-400">
                                        ⭐ {review.rating}
                                    </p>

                                </div>

                                <p className="text-gray-400 leading-relaxed">
                                    {review.comment}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </main>
    );
}