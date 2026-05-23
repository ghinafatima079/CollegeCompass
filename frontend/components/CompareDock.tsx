"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    getCompareColleges,
    removeFromCompare,
    CompareCollege
} from "@/utils/compare";

export default function CompareDock() {

    const [colleges, setColleges] =
        useState<CompareCollege[]>([]);

    const [expanded, setExpanded] =
        useState(false);

    const [showLimitAlert, setShowLimitAlert] =
        useState(false);

    const loadColleges = () => {
        setColleges(getCompareColleges());
    };

    useEffect(() => {

        loadColleges();

        const handleLimit = () => {

            setShowLimitAlert(true);

            setTimeout(() => {
                setShowLimitAlert(false);
            }, 2200);
        };

        window.addEventListener(
            "compareUpdated",
            loadColleges
        );

        window.addEventListener(
            "compareLimitReached",
            handleLimit
        );

        return () => {
            window.removeEventListener(
                "compareUpdated",
                loadColleges
            );
            window.removeEventListener(
                "compareLimitReached",
                handleLimit
            );
        };

    }, []);

    return (

        <>

            {showLimitAlert && (

                <div className="fixed bottom-28 right-6 z-[60] bg-[#171b22]/95 backdrop-blur-xl border border-[#2a3140] text-gray-300 px-4 py-3 md:px-5 md:py-4 rounded-2xl text-sm shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">

                    Maximum 3 colleges can be compared

                </div>

            )}

            <div
                className="
fixed
bottom-4
right-4
md:bottom-8
md:right-8
z-50
"
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
            >

                {/* COLLAPSED BUTTON */}

                <div className="bg-[#161b22]/95 backdrop-blur-xl border border-[#262c36] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">

                    {/* ICON BAR */}

                    <div className="flex items-center gap-3 px-5 py-4">

                        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-semibold">
                            ⇄
                        </div>

                        <div>

                            <p className="text-white text-sm font-medium">
                                Compare
                            </p>

                            <p className="text-gray-400 text-xs">
                                {colleges.length} selected
                            </p>

                        </div>

                    </div>

                    {/* EXPANDED CONTENT */}

                    {expanded && (

                        <div className="border-t border-[#262c36] px-5 py-4 w-[320px]">

                            {colleges.length === 0 ? (

                                <p className="text-gray-400 text-sm">
                                    No colleges selected yet.
                                </p>

                            ) : (

                                <div>

                                    <div className="flex flex-wrap gap-2">

                                        {colleges.map((college) => (

                                            <div
                                                key={college.id}
                                                className="bg-[#222833] border border-[#303846] px-3 py-2 rounded-xl text-sm text-gray-300 flex items-center gap-2"
                                            >

                                                <span className="truncate max-w-[140px]">
                                                    {college.name}
                                                </span>

                                                <button
                                                    onClick={() => {

                                                        removeFromCompare(
                                                            college.id
                                                        );

                                                        loadColleges();
                                                    }}
                                                    className="text-gray-500 hover:text-white"
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                    {colleges.length >= 2 && (

                                        <Link
                                            href="/compare"
                                            className="mt-4 block text-center bg-violet-600 hover:bg-violet-500 transition px-4 py-3 rounded-xl text-sm font-medium text-white"
                                        >
                                            Compare Now
                                        </Link>

                                    )}

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </div>
        </>
    );
}