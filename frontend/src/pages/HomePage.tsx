
import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  posted: string;
  initials: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova",
    location: "Beirut, Lebanon",
    type: "Full-time",
    category: "Technology",
    salary: "$1,800 – $2,500",
    posted: "2 days ago",
    initials: "TN",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Studio North",
    location: "Remote",
    type: "Remote",
    category: "Design",
    salary: "$1,200 – $1,800",
    posted: "3 days ago",
    initials: "SN",
  },
  {
    id: 3,
    title: "Digital Marketing Specialist",
    company: "Growth Media",
    location: "Beirut, Lebanon",
    type: "Full-time",
    category: "Marketing",
    salary: "$900 – $1,400",
    posted: "4 days ago",
    initials: "GM",
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudWorks",
    location: "Hybrid",
    type: "Hybrid",
    category: "Technology",
    salary: "$1,500 – $2,200",
    posted: "5 days ago",
    initials: "CW",
  },
  {
    id: 5,
    title: "Financial Analyst",
    company: "Cedar Capital",
    location: "Beirut, Lebanon",
    type: "Full-time",
    category: "Finance",
    salary: "$1,100 – $1,700",
    posted: "1 week ago",
    initials: "CC",
  },
  {
    id: 6,
    title: "Sales Account Executive",
    company: "NextStep",
    location: "Tripoli, Lebanon",
    type: "Full-time",
    category: "Sales",
    salary: "$800 – $1,300",
    posted: "1 week ago",
    initials: "NS",
  },
];

const categories = [
  "All Jobs",
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Sales",
];

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Jobs");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    const place = location.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [job.title, job.company, job.category].some((value) =>
          value.toLowerCase().includes(query),
        );

      const matchesLocation =
        !place || job.location.toLowerCase().includes(place);

      const matchesCategory =
        category === "All Jobs" || job.category === category;

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [search, location, category]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    document.getElementById("latest-jobs")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      {/* Date bar */}
      <div className="border-b border-[#e8e8e8] py-3 text-center text-[10px] tracking-wide text-[#777]">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      {/* Logo header */}
      <header className="border-b border-[#e8e8e8]">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-center px-5">
          <Link
            to="/"
            className="text-[42px] font-black leading-none tracking-[-3px] text-[#ed1c24]"
          >
            forsa
          </Link>

          <Link
            to="/register"
            className="absolute right-5 text-[11px] font-bold uppercase tracking-[1px] hover:text-[#ed1c24] sm:right-8"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-[#e8e8e8]">
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 text-[11px] font-semibold sm:gap-9">
          <Link to="/" className="hover:text-[#ed1c24]">
            Home
          </Link>
          <a href="#latest-jobs" className="hover:text-[#ed1c24]">
            Find Jobs
          </a>
          <a href="#categories" className="hover:text-[#ed1c24]">
            Categories
          </a>
          <Link to="/login" className="hover:text-[#ed1c24]">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-[#ed1c24] px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-white hover:bg-[#d71920]"
          >
            Join Forsa
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-[#e8e8e8] px-5 pb-16 pt-16 text-center sm:pb-20 sm:pt-20">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
          YOUR NEXT OPPORTUNITY STARTS HERE
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-[-2px] sm:text-6xl">
          Find a job that
          <br />
          <span className="text-[#ed1c24]">moves you forward.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#777] sm:text-base">
          Explore career opportunities, connect with employers,
          and find the right role for your future.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 flex max-w-4xl flex-col border border-[#dedede] bg-white md:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 border-b border-[#dedede] px-5 md:border-b-0 md:border-r">
            <svg
              className="h-5 w-5 shrink-0 text-[#999]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              aria-label="Job title or keyword"
              placeholder="Job title, keyword, or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#999]"
            />
          </div>

          <div className="flex flex-1 items-center gap-3 px-5">
            <svg
              className="h-5 w-5 shrink-0 text-[#999]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <input
              type="text"
              aria-label="Location"
              placeholder="City or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-14 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#999]"
            />
          </div>

          <button
            type="submit"
            className="min-h-14 bg-[#ed1c24] px-9 text-xs font-bold uppercase tracking-[1px] text-white transition hover:bg-[#d71920]"
          >
            Search Jobs →
          </button>
        </form>

        <p className="mt-5 text-xs text-[#999]">
          Popular searches: Developer · Designer · Marketing · Remote
        </p>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-6xl px-5 py-14"
      >
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
              EXPLORE
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Browse by category
            </h2>
          </div>
          <a
            href="#latest-jobs"
            className="text-xs font-bold uppercase hover:text-[#ed1c24]"
          >
            View Jobs →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.slice(1).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                document.getElementById("latest-jobs")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="group flex min-h-24 flex-col items-start justify-between border border-[#e5e5e5] p-4 text-left transition hover:border-[#ed1c24]"
            >
              <span className="text-sm font-bold">{item}</span>
              <span className="self-end text-lg text-[#aaa] transition group-hover:text-[#ed1c24]">
                ↗
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Latest jobs */}
      <section
        id="latest-jobs"
        className="border-t border-[#e8e8e8] bg-[#fafafa] py-16"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
                OPPORTUNITIES
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Latest job openings
              </h2>
              <p className="mt-2 text-sm text-[#888]">
                Discover opportunities from growing companies.
              </p>
            </div>
            <span className="text-xs text-[#888]">
              {filteredJobs.length} jobs found
            </span>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`border px-4 py-2 text-xs font-semibold transition ${
                  category === item
                    ? "border-[#ed1c24] bg-[#ed1c24] text-white"
                    : "border-[#ddd] bg-white text-[#555] hover:border-[#ed1c24]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Job cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="border border-[#e5e5e5] bg-white p-6 transition hover:border-[#bbb]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#e5e5e5] bg-[#fafafa] text-sm font-extrabold text-[#333]">
                    {job.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#888]">
                      {job.company}
                    </p>
                    <h3 className="mt-1 text-lg font-bold tracking-tight">
                      {job.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#888]">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="border border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#666]">
                    {job.type}
                  </span>
                  <span className="border border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#666]">
                    {job.category}
                  </span>
                  <span className="border border-[#e8e8e8] px-3 py-1.5 text-[11px] text-[#666]">
                    {job.salary}
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#eee] pt-4">
                  <span className="text-xs text-[#999]">
                    {job.posted}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-xs font-bold uppercase tracking-wide text-[#ed1c24] hover:underline"
                  >
                    Apply Now →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="border border-[#e5e5e5] bg-white px-5 py-16 text-center">
              <h3 className="text-lg font-bold">No jobs found</h3>
              <p className="mt-2 text-sm text-[#888]">
                Try a different keyword, location, or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setCategory("All Jobs");
                }}
                className="mt-5 text-xs font-bold uppercase text-[#ed1c24]"
              >
                Clear Filters
              </button>
            </div>
          )}

          <p className="mt-5 text-center text-xs text-[#999]">
            Demo listings — replace with your backend jobs API.
          </p>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="border-t border-[#e8e8e8] px-5 py-20 text-center">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
          FOR EMPLOYERS
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Looking for the right talent?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#888]">
          Connect with candidates and grow your team with Forsa.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#ed1c24] px-8 text-xs font-bold uppercase tracking-wide text-white hover:bg-[#d71920]"
        >
          Get Started →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e8e8] bg-[#fafafa]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <Link
            to="/"
            className="text-2xl font-black tracking-[-1.5px] text-[#ed1c24]"
          >
            forsa
          </Link>
          <p className="text-xs text-[#999]">
            © {new Date().getFullYear()} Forsa. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-medium text-[#666]">
            <Link to="/login" className="hover:text-[#ed1c24]">
              Sign In
            </Link>
            <Link to="/register" className="hover:text-[#ed1c24]">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
