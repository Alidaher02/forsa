
import { useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Beirut, Lebanon",
    type: "Full-time",
    category: "Technology",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    type: "Remote",
    category: "Design",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "CloudWorks",
    location: "Beirut, Lebanon",
    type: "Full-time",
    category: "Technology",
  },
  {
    id: 4,
    title: "Marketing Specialist",
    company: "Growth Media",
    location: "Hybrid",
    type: "Hybrid",
    category: "Marketing",
  },
];

export default function JobsPage() {
  const [showResumeModal, setShowResumeModal] = useState(
    () => sessionStorage.getItem("forsa_resume_prompt_seen") !== "true"
  );
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function closeModal() {
    sessionStorage.setItem("forsa_resume_prompt_seen", "true");
    setShowResumeModal(false);
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = file.name.toLowerCase().slice(
      file.name.lastIndexOf(".")
    );

    if (!allowedExtensions.includes(extension)) {
      setFileError("Please select a PDF, DOC, or DOCX file.");
      setResume(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File must be smaller than 5MB.");
      setResume(null);
      return;
    }

    setFileError("");
    setResume(file);
  }

  function handleResumeContinue() {
    if (!resume) return;

    // TODO: Upload resume to your backend API.
    // For now, this only confirms file selection.
    closeModal();
  }

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      {/* Header */}
      <header className="border-b border-[#e8e8e8]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="text-[38px] font-black tracking-[-2px] text-[#ed1c24]"
          >
            forsa
          </Link>

          <nav className="flex items-center gap-6 text-xs font-semibold">
            <Link to="/" className="hover:text-[#ed1c24]">
              Home
            </Link>
            <span className="text-[#ed1c24]">Find Jobs</span>
            <Link to="/register" className="hover:text-[#ed1c24]">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Page title */}
      <section className="border-b border-[#e8e8e8] py-14">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
            FORSA CAREERS
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Find your next opportunity.
          </h1>
          <p className="mt-4 text-sm text-[#777]">
            Explore the latest opportunities and find the right fit.
          </p>
        </div>
      </section>

      {/* Jobs */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8">
          <label htmlFor="job-search" className="sr-only">
            Search jobs
          </label>
          <input
            id="job-search"
            type="search"
            placeholder="Search jobs, companies, or locations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-12 w-full max-w-xl border border-[#ddd] px-4 text-sm outline-none focus:border-[#ed1c24]"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="border border-[#e5e5e5] bg-white p-6 transition hover:border-[#ed1c24]"
            >
              <p className="text-xs text-[#888]">{job.company}</p>
              <h2 className="mt-2 text-xl font-bold">{job.title}</h2>
              <p className="mt-3 text-sm text-[#777]">{job.location}</p>

              <div className="mt-5 flex gap-2">
                <span className="border border-[#eee] px-3 py-1.5 text-xs">
                  {job.type}
                </span>
                <span className="border border-[#eee] px-3 py-1.5 text-xs">
                  {job.category}
                </span>
              </div>

              <div className="mt-6 border-t border-[#eee] pt-4">
                <span className="text-xs font-bold uppercase text-[#ed1c24]">
                  View opportunity →
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="py-12 text-center text-sm text-[#888]">
            No matching jobs found.
          </p>
        )}

        <p className="mt-8 text-xs text-[#999]">
          Demo listings — connect your jobs API when ready.
        </p>
      </section>

      {/* Resume overlay */}
      {showResumeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="relative w-full max-w-[470px] bg-white p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close resume upload"
              className="absolute right-5 top-4 text-2xl text-[#999] hover:text-black"
            >
              ×
            </button>

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
              COMPLETE YOUR PROFILE
            </p>

            <h2
              id="resume-modal-title"
              className="text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              Upload your resume.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#777]">
              Get ready for your next opportunity by adding your CV.
              You can also skip this step and upload it later.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleFile}
              aria-label="Select resume"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-7 flex w-full flex-col items-center justify-center border border-dashed border-[#ccc] bg-[#fafafa] px-5 py-10 text-center transition hover:border-[#ed1c24]"
            >
              <svg
                className="mb-4 h-9 w-9 text-[#ed1c24]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"
                />
              </svg>

              <span className="text-sm font-bold">
                {resume ? resume.name : "Click to select your resume"}
              </span>

              <span className="mt-2 text-xs text-[#999]">
                PDF, DOC, DOCX · Maximum 5MB
              </span>
            </button>

            {fileError && (
              <p role="alert" className="mt-3 text-xs text-red-600">
                {fileError}
              </p>
            )}

            <button
              type="button"
              disabled={!resume}
              onClick={handleResumeContinue}
              className="mt-6 h-12 w-full bg-[#ed1c24] text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#d71920] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="mt-4 w-full py-2 text-xs font-semibold text-[#777] hover:text-black"
            >
              Maybe later
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
