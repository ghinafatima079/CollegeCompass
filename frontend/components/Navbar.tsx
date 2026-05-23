"use client";

import Link from "next/link";
import Image from "next/image";

import {
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";

export default function Navbar() {

    return (

        <header className="sticky top-0 z-50 border-b border-[#1f2630] bg-[#0f1115]/85 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* LEFT */}

                <Link
                    href="/"
                    className="flex items-center gap-3 shrink-0"
                >

                    <Image
                        src="/logo.png"
                        alt="CollegeCompass"
                        width={34}
                        height={34}
                        className="rounded-md object-contain"
                    />

                    <span className="text-lg md:text-xl font-semibold text-white whitespace-nowrap">
                        CollegeCompass
                    </span>

                </Link>

                {/* DESKTOP NAV */}

                <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">

                    <Link
                        href="/"
                        className="hover:text-white transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/colleges"
                        className="hover:text-white transition"
                    >
                        Explore
                    </Link>

                    <Link
                        href="/compare"
                        className="hover:text-white transition"
                    >
                        Compare
                    </Link>

                    <Link
                        href="/saved"
                        className="hover:text-white transition"
                    >
                        Saved
                    </Link>

                    <SignedOut>

                        <Link
                            href="/sign-in"
                            className="hover:text-white transition"
                        >
                            Sign In
                        </Link>

                    </SignedOut>

                    <SignedIn>

                        <UserButton />

                    </SignedIn>

                </nav>

                {/* MOBILE NAV */}

                <nav className="md:hidden flex items-center gap-4 text-xs text-gray-400">

                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/colleges">
                        Explore
                    </Link>

                    <Link href="/compare">
                        Compare
                    </Link>

                </nav>

            </div>

        </header>
    );
}