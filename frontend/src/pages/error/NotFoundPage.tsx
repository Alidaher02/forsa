
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white font-sans text-black">
      {/* Date bar */}
      <div className="border-b border-[#e8e8e8] py-3 text-center text-[10px] tracking-wide text-[#777]">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      {/* Header */}
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
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-5 overflow-x-auto px-4 text-[11px] font-semibold sm:gap-8">
          <Link to="/" className="hover:text-[#ed1c24]">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-[#ed1c24]">
            Find Jobs
          </Link>

          <Link to="/companies" className="hover:text-[#ed1c24]">
            Companies
          </Link>

          <Link to="/login" className="hover:text-[#ed1c24]">
            Sign In
          </Link>

          <span className="bg-[#ed1c24] px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-white">
            Careers
          </span>
        </div>
      </nav>

      {/* 404 content */}
      <section className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
          FORSA CAREERS
        </p>

        <h1 className="text-[110px] font-black leading-none tracking-[-7px] text-[#ed1c24] sm:text-[160px]">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Page not found.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#888]">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to discovering opportunities.
        </p>

        <Link
          to="/"
          className="mt-9 inline-flex h-13 min-h-[52px] items-center justify-center gap-3 bg-[#ed1c24] px-9 text-[12px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#d71920]"
        >
          Back to homepage
          <span className="text-lg font-normal">→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e8e8] py-6 text-center text-[11px] text-[#999]">
        © {new Date().getFullYear()} Forsa. All rights reserved.
      </footer>
    </main>
  );
}
