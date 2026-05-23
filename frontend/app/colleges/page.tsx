"use client";

import { useEffect, useState } from "react";
import { College } from "@/types/college";
import { getColleges } from "@/services/collegeService";
import CollegeCard from "@/components/CollegeCard";
import Navbar from "@/components/Navbar";

import Skeleton from "@/components/Skeleton";

export default function CollegesPage() {

    const [colleges, setColleges] = useState<College[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchColleges();
    }, [page]);

    const fetchColleges = async () => {
        const data = await getColleges(
            search,
            "",
            page
        );
        setColleges(data);
    };

    return (
        <main className="min-h-screen bg-[#0f1115]">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

                    <div>

                        <p className="text-violet-400 text-sm font-medium mb-3">
                            ALL COLLEGES
                        </p>

                        <h1 className="text-5xl font-semibold tracking-tight text-white">
                            Discover Colleges
                        </h1>

                        <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed">
                            Explore placements, fees, and opportunities across top engineering institutions in India.
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Search colleges..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#161b22] border border-[#262c36] rounded-xl px-4 py-3 w-72 outline-none text-white placeholder:text-gray-500 focus:border-violet-500 transition"
                        />

                        <button
                            onClick={fetchColleges}
                            className="bg-violet-600 hover:bg-violet-500 transition text-white px-5 py-3 rounded-xl font-medium"
                        >
                            Search
                        </button>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                    {colleges.length === 0 ? (

                        Array.from({ length: 6 }).map((_, index) => (

                            <div
                                key={index}
                                className="bg-[#11151c] border border-[#1d2430] rounded-3xl overflow-hidden"
                            >

                                <Skeleton className="h-52 w-full rounded-none" />

                                <div className="p-5">

                                    <Skeleton className="h-6 w-3/4" />

                                    <Skeleton className="h-4 w-1/2 mt-4" />

                                    <div className="grid grid-cols-2 gap-4 mt-8">

                                        <Skeleton className="h-16" />
                                        <Skeleton className="h-16" />

                                    </div>

                                    <Skeleton className="h-12 mt-6" />
                                    <Skeleton className="h-12 mt-4" />

                                </div>

                            </div>

                        ))

                    ) : (

                        colleges.map((college) => (

                            <CollegeCard
                                key={college.id}
                                college={college}
                            />

                        ))

                    )}

                </div>

                <div className="flex items-center justify-center gap-4 mt-16">

                    <button
                        onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="px-5 py-2 rounded-xl border border-[#2a3140] text-gray-300 hover:border-violet-500 transition"
                    >
                        Previous
                    </button>

                    <div className="px-5 py-2 rounded-xl bg-[#161b22] border border-[#262c36] text-white">
                        Page {page}
                    </div>

                    <button
                        onClick={() =>
                            setPage((prev) => prev + 1)
                        }
                        className="px-5 py-2 rounded-xl border border-[#2a3140] text-gray-300 hover:border-violet-500 transition"
                    >
                        Next
                    </button>

                </div>

            </div>

        </main>
    );
}