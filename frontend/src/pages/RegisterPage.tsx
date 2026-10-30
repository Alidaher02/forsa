
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate("/login", { state: { registrationComplete: true } });
    } catch (caughtError) {
      if (axios.isAxiosError(caughtError)) {
        const errors = caughtError.response?.data?.errors as
          | Record<string, string[]>
          | undefined;

        setError(
          errors
            ? Object.values(errors).flat().join(" ")
            : "Unable to create your account.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }


  const inputClass =
    "h-12 w-full border border-[#d9d9d9] bg-white px-4 text-sm text-black placeholder:text-[#999] outline-none transition-colors focus:border-[#ed1c24]";

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      {/* Top date */}
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
            to="/login"
            className="absolute right-5 text-[11px] font-bold uppercase tracking-[1px] text-black hover:text-[#ed1c24] sm:right-8"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-[#e8e8e8]">
        <div className="mx-auto flex min-h-11 max-w-7xl items-center justify-center gap-5 overflow-x-auto px-4 text-[11px] font-semibold sm:gap-8">
          <Link
            to="/"
            className="whitespace-nowrap transition hover:text-[#ed1c24]"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="whitespace-nowrap transition hover:text-[#ed1c24]"
          >
            Find Jobs
          </Link>

          <Link
            to="/companies"
            className="whitespace-nowrap transition hover:text-[#ed1c24]"
          >
            Companies
          </Link>

          <Link
            to="/login"
            className="whitespace-nowrap transition hover:text-[#ed1c24]"
          >
            Sign In
          </Link>

          <span className="whitespace-nowrap bg-[#ed1c24] px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-white">
            Careers
          </span>
        </div>
      </nav>

      {/* Register content */}
      <section className="mx-auto w-full max-w-[540px] px-5 pb-16 pt-12 sm:pt-16">
        <div className="mb-9 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
            FORSA CAREERS
          </p>

          <h1 className="text-[36px] font-extrabold leading-tight tracking-[-1.5px] text-black sm:text-[46px]">
            Create your account
          </h1>

          <p className="mx-auto mt-4 max-w-[410px] text-[14px] leading-7 text-[#888]">
            Join Forsa to discover opportunities, connect with
            employers, and take the next step in your career.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.5px]"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              className={inputClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.5px]"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className={inputClass}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.5px]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="Enter your password"
              className={inputClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="password-confirmation"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.5px]"
            >
              Confirm password
            </label>

            <input
              id="password-confirmation"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder="Confirm your password"
              className={inputClass}
              value={passwordConfirmation}
              onChange={(event) =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />
          </div>

          {/* Errors */}
          {error && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-13 min-h-[52px] w-full items-center justify-center gap-3 bg-[#ed1c24] text-[12px] font-bold uppercase tracking-[1px] text-white transition-colors hover:bg-[#d71920] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              "Creating account..."
            ) : (
              <>
                Create account
                <span className="text-lg font-normal">→</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-7 text-center text-[13px] text-[#888]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:text-[#ed1c24]"
          >
            Sign in
          </Link>
        </p>
      </section>

      <footer className="border-t border-[#e8e8e8] py-6 text-center text-[11px] text-[#999]">
        © {new Date().getFullYear()} Forsa. All rights reserved.
      </footer>
    </main>
  );

}
