
import { Link } from "react-router-dom";

type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
};

type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
};

type Education = {
  degree: string;
  institution: string;
  period: string;
  description?: string;
};

const profile = {
  full_name: "Ali Mohammad Daher",
  headline: "Full Stack Developer",
  bio: "Passionate full-stack developer with hands-on experience building responsive web applications, RESTful APIs, and database-driven platforms. Skilled in Laravel, PHP, JavaScript, React, and MySQL. Focused on developing clean, maintainable solutions and delivering practical digital experiences.",

  email: "ali.daher@example.com",
  phone: "+961 70 123 456",
  location: "Beirut, Lebanon",

  linkedin: "https://linkedin.com",
  github: "https://github.com/Alidaher02",
  website: "https://example.com",

  skills: [
    "PHP",
    "Laravel",
    "JavaScript",
    "TypeScript",
    "React",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "MySQL",
    "PostgreSQL",
    "REST APIs",
    "Git",
    "GitHub",
    "Java",
    "C++",
  ],

  experience: [
    {
      title: "Full Stack Developer",
      company: "Freelance / Personal Projects",
      location: "Beirut, Lebanon",
      period: "2025 — Present",
      description:
        "Designed and developed full-stack applications using Laravel, PHP, MySQL, React, and Tailwind CSS. Built authentication systems, role-based dashboards, REST APIs, and interactive frontend interfaces.",
    },
    {
      title: "Web Development Intern",
      company: "Digital Solutions Studio",
      location: "Beirut, Lebanon",
      period: "2025",
      description:
        "Collaborated on responsive website development, improved UI components, and assisted with API integration and database operations.",
    },
  ] satisfies Experience[],

  projects: [
    {
      name: "SmartShip",
      description:
        "Cold-chain shipment monitoring platform with temperature tracking, alerts, role-based access, and shipment management dashboards.",
      technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    },
    {
      name: "Forsa",
      description:
        "Job board platform designed to connect candidates with employers, featuring candidate profiles, resume management, and job discovery.",
      technologies: ["React", "TypeScript", "Laravel", "Tailwind CSS"],
    },
    {
      name: "VibeMart",
      description:
        "E-commerce platform featuring product management, shopping carts, discounts, and a responsive storefront.",
      technologies: ["Laravel", "Alpine.js", "MySQL"],
    },
    {
      name: "Ratix",
      description:
        "Movie discovery and rating platform with user reviews, movie listings, and database-driven content.",
      technologies: ["PHP", "MySQL", "JavaScript"],
    },
  ] satisfies Project[],

  education: [
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "Lebanese International University",
      period: "2023 — Present",
      description:
        "Coursework in software engineering, databases, object-oriented programming, and data structures.",
    },
  ] satisfies Education[],

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "German", level: "Beginner" },
  ],
};

// Reusable section title
function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7 border-b border-[#e8e8e8] pb-5">
      <div className="flex items-start gap-4">
        <span className="pt-1 text-xs font-extrabold text-[#ed1c24]">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-[#888]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const initials = profile.full_name
    .split(" ")
    .slice(0, 2)
    .map((name) => name[0])
    .join("");

  return (
    <div className="bg-white text-black">
      {/* Profile hero */}
      <section className="border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#ed1c24]">
              FORSA / MY PROFILE
            </p>

            <span className="border border-[#e8e8e8] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#777]">
              Candidate Profile
            </span>
          </div>

          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-[#ed1c24] text-4xl font-black text-white">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                {profile.full_name}
              </h1>

              <p className="mt-3 text-lg font-medium text-[#555]">
                {profile.headline}
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#777]">
                <span>⌖ {profile.location}</span>
                <span>{profile.email}</span>
                <span>{profile.phone}</span>
              </div>
            </div>

            <button
              type="button"
              className="self-start border border-[#ddd] px-6 py-3 text-xs font-bold uppercase tracking-wide transition hover:border-[#ed1c24] hover:text-[#ed1c24]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Left column */}
        <div className="min-w-0 space-y-14">
          {/* About */}
          <section>
            <SectionTitle
              number="01"
              title="About Me"
              subtitle="Professional summary"
            />

            <p className="text-sm leading-8 text-[#555]">
              {profile.bio}
            </p>
          </section>

          {/* Experience */}
          <section>
            <SectionTitle
              number="02"
              title="Work Experience"
              subtitle="Professional background and experience"
            />

            <div className="space-y-8">
              {profile.experience.map((job, index) => (
                <article
                  key={index}
                  className="border-l-2 border-[#ed1c24] pl-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-[#555]">
                        {job.company}
                      </p>
                    </div>

                    <span className="text-xs text-[#999]">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#999]">
                    {job.location}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#666]">
                    {job.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <SectionTitle
              number="03"
              title="Projects"
              subtitle="Selected projects and technical work"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {profile.projects.map((project, index) => (
                <article
                  key={index}
                  className="flex flex-col border border-[#e8e8e8] p-6 transition hover:border-[#ed1c24]"
                >
                  <p className="text-[11px] font-bold tracking-wider text-[#ed1c24]">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 text-xl font-extrabold">
                    {project.name}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#777]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-[#eee] px-2.5 py-1.5 text-[11px] text-[#666]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 text-xs font-bold uppercase text-[#ed1c24]"
                    >
                      View Project →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionTitle
              number="04"
              title="Education"
              subtitle="Academic qualifications"
            />

            <div className="space-y-6">
              {profile.education.map((education, index) => (
                <article
                  key={index}
                  className="border-b border-[#eee] pb-6 last:border-0"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold">
                        {education.degree}
                      </h3>

                      <p className="mt-2 text-sm font-medium text-[#666]">
                        {education.institution}
                      </p>
                    </div>

                    <span className="text-xs text-[#999]">
                      {education.period}
                    </span>
                  </div>

                  {education.description && (
                    <p className="mt-4 text-sm leading-7 text-[#777]">
                      {education.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="min-w-0 space-y-10">
          {/* Skills */}
          <section>
            <SectionTitle number="05" title="Skills" />

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#e5e5e5] px-3 py-2 text-xs font-semibold text-[#555]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <SectionTitle number="06" title="Languages" />

            <div className="space-y-4">
              {profile.languages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-center justify-between gap-3 border-b border-[#eee] pb-3"
                >
                  <span className="text-sm font-semibold">
                    {language.name}
                  </span>

                  <span className="text-xs text-[#999]">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <SectionTitle number="07" title="Contact & Links" />

            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="block break-all text-sm text-[#666] hover:text-[#ed1c24]"
              >
                {profile.email}
              </a>

              {[
                { label: "LinkedIn", url: profile.linkedin },
                { label: "GitHub", url: profile.github },
                { label: "Portfolio", url: profile.website },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[#eee] pb-3 text-sm font-semibold transition hover:text-[#ed1c24]"
                >
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          </section>

          {/* Resume CTA */}
          <div className="border-t-[3px] border-[#ed1c24] bg-[#fafafa] p-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#ed1c24]">
              YOUR RESUME
            </p>

            <h3 className="mt-3 text-lg font-extrabold">
              Keep your profile updated.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#777]">
              Your professional profile helps employers discover
              your skills and experience.
            </p>

            <button
              type="button"
              className="mt-5 w-full bg-[#ed1c24] px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#d71920]"
            >
              Update Resume →
            </button>
          </div>

          <Link
            to="/jobs"
            className="inline-block text-xs font-bold uppercase tracking-wide text-[#ed1c24] hover:underline"
          >
            ← Back to Jobs
          </Link>
        </aside>
      </div>
    </div>
  );
}
