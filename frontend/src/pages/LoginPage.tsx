
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../features/auth/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);

      navigate("/projects");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response);
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);

        if (error.response?.status === 401) {
          setError("Invalid email or password.");
        } else if (!error.response) {
          setError("Cannot connect to the backend.");
        } else {
          setError("Login failed.");
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const inputClass =
    "h-14 w-full border border-[#d9d9d9] bg-white px-4 text-sm text-black placeholder:text-[#999] outline-none transition-colors focus:border-[#ed1c24]";

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

      {/* Login content */}
      <section className="mx-auto w-full max-w-[580px] px-5 pb-20 pt-16 sm:pt-20">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
            FORSA CAREERS
          </p>

          <h1 className="text-[42px] font-extrabold leading-tight tracking-[-1.5px] text-black sm:text-[52px]">
            Welcome back
          </h1>

          <p className="mx-auto mt-4 max-w-[420px] text-[14px] leading-7 text-[#888]">
            Sign in to manage your applications, discover opportunities,
            and continue your journey.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[12px] font-bold uppercase tracking-[0.5px]"
            >
              Email address
            </label>

            <div className="relative">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aaa]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="1" />
                <path d="m3 7 9 7 9-7" />
              </svg>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[12px] font-bold uppercase tracking-[0.5px]"
            >
              Password
            </label>

            <div className="relative">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aaa]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="5" y="10" width="14" height="11" rx="1" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-14 w-full items-center justify-center gap-3 bg-[#ed1c24] text-[12px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#d71920] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <span className="text-lg font-normal">→</span>
              </>
            )}
          </button>

          <p className="text-center text-[13px] text-[#888]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black hover:text-[#ed1c24]"
            >
              Create account
            </Link>
          </p>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e8e8] py-6 text-center text-[11px] text-[#999]">
        © {new Date().getFullYear()} Forsa. All rights reserved.
      </footer>
    </main>
  );
}
