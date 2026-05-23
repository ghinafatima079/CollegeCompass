import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import CompareDock from "@/components/CompareDock";

import { ClerkProvider } from "@clerk/nextjs";

import {
  SavedProvider
} from "@/context/SavedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CollegeCompass",
  description:
    "Explore, compare, and shortlist colleges with clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <SavedProvider>
            <CompareDock />
            {children}
          </SavedProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
