import Link from "next/link";

import Navbar from "@/components/Navbar";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#0b0d12] text-white">

      <Navbar />

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-24 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT */}

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
              CollegeCompass
            </p>

            <h1 className="text-5xl md:text-6xl leading-[1.05] tracking-tight font-medium mt-8">

              Make smarter
              <br />
              college decisions.

            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed mt-10 max-w-xl">

              Explore colleges, compare opportunities,
              evaluate placements, and build your shortlist
              with clarity.

            </p>

            <div className="flex flex-wrap items-center gap-4 mt-12">

              <Link
                href="/colleges"
                className="bg-violet-600 hover:bg-violet-500 transition px-6 py-4 rounded-2xl text-sm font-medium"
              >
                Explore Colleges
              </Link>

              <Link
                href="/compare"
                className="border border-[#252b35] hover:border-[#3b4452] transition px-6 py-4 rounded-2xl text-sm text-gray-300"
              >
                Compare
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="border border-[#171b22] rounded-3xl overflow-hidden bg-[#0f1218]">

            {/* TOP */}

            <div className="grid grid-cols-3 border-b border-[#171b22]">

              <div className="p-4 md:p-6">

                <p className="text-gray-500 text-sm">
                  IIT Madras
                </p>

                <h3 className="text-xl md:text-2xl font-medium mt-5">
                  ₹21L
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  Avg Package
                </p>

              </div>

              <div className="p-4 md:p-6 border-l border-[#171b22] bg-[#10141c]">

                <p className="text-gray-500 text-sm">
                  IIT Delhi
                </p>

                <h3 className="text-xl md:text-2xl font-medium mt-5">
                  ₹19L
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  Avg Package
                </p>

              </div>

              <div className="p-4 md:p-6 border-l border-[#171b22]">

                <p className="text-gray-500 text-sm">
                  NIT Trichy
                </p>

                <h3 className="text-xl md:text-2xl font-medium mt-5">
                  ₹13L
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  Avg Package
                </p>

              </div>

            </div>

            {/* ROWS */}

            <ComparisonPreviewRow
              label="Placements"
              values={["97%", "96%", "91%"]}
            />

            <ComparisonPreviewRow
              label="Rating"
              values={["4.9", "4.8", "4.6"]}
            />

            <ComparisonPreviewRow
              label="Fees"
              values={["₹8L", "₹9L", "₹5L"]}
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="border-t border-[#171b22]">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

            <FeatureBlock
              title="Explore"
              description="Browse institutions, placements, courses and opportunities across India."
            />

            <FeatureBlock
              title="Compare"
              description="Evaluate colleges side-by-side through a focused comparison experience."
            />

            <FeatureBlock
              title="Save"
              description="Build a shortlist of colleges and revisit them anytime."
            />

          </div>

        </div>

      </section>

      {/* FEATURED */}

      <section className="border-t border-[#171b22]">

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">

          <div className="flex items-end justify-between mb-14">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
                Featured
              </p>

              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mt-6">
                Top Institutions
              </h2>

            </div>

            <Link
              href="/colleges"
              className="text-sm text-gray-500 hover:text-white transition"
            >
              View all
            </Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <FeaturedCollege
              id={1}
              name="IIT Madras"
              location="Chennai, Tamil Nadu"
            />

            <FeaturedCollege
              id={2}
              name="IIT Delhi"
              location="New Delhi"
            />

            <FeaturedCollege
              id={3}
              name="NIT Trichy"
              location="Tiruchirappalli, Tamil Nadu"
            />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="border-t border-[#171b22]">

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 text-center">

          <p className="text-xs uppercase tracking-[0.2em] text-violet-400">
            Start Exploring
          </p>

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-8 leading-tight">

            Discover colleges
            <br />
            with clarity.

          </h2>

          <Link
            href="/colleges"
            className="inline-block mt-12 bg-violet-600 hover:bg-violet-500 transition px-7 py-4 rounded-2xl text-sm font-medium"
          >
            Explore Colleges
          </Link>

        </div>

      </section>

    </main>

  );
}

interface ComparisonPreviewRowProps {
  label: string;
  values: string[];
}

function ComparisonPreviewRow({
  label,
  values
}: ComparisonPreviewRowProps) {

  return (

    <div className="grid grid-cols-4 border-t border-[#171b22]">

      <div className="p-4 md:p-5 text-gray-600 text-sm">
        {label}
      </div>

      {values.map((value, index) => (

        <div
          key={index}
          className="p-4 md:p-5 border-l border-[#171b22]"
        >

          {value}

        </div>

      ))}

    </div>

  );
}

interface FeatureBlockProps {
  title: string;
  description: string;
}

function FeatureBlock({
  title,
  description
}: FeatureBlockProps) {

  return (

    <div>

      <p className="text-violet-400 text-sm">
        {title}
      </p>

      <h3 className="text-2xl font-medium mt-5">
        {title} colleges intelligently
      </h3>

      <p className="text-gray-500 leading-relaxed mt-5">
        {description}
      </p>

    </div>

  );
}

interface FeaturedCollegeProps {

  id: number;

  name: string;

  location: string;
}

function FeaturedCollege({
  id,
  name,
  location
}: FeaturedCollegeProps) {

  return (

    <Link
      href={`/college/${id}`}
      className="block h-full"
    >

      <div className="border border-[#171b22] rounded-3xl p-8 hover:border-[#2a3140] transition h-full bg-[#0f1218]">

        <div className="w-14 h-14 rounded-2xl bg-[#12161d]" />

        <h3 className="text-2xl font-medium mt-8 leading-tight">

          {name}

        </h3>

        <p className="text-gray-500 mt-3">

          {location}

        </p>

      </div>

    </Link>

  );
}