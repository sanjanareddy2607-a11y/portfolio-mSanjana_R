import Link from "next/link";
import { site } from "@/lib/content";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/engineering-lab", label: "Engineering Lab" },
  { href: "/beyond-the-code", label: "Beyond the Code" },
  { href: "/contact", label: "Contact" },
];

const indexLinks = [
  { href: "/about#education", label: "Education" },
  { href: "/achievements", label: "Achievements" },
  { href: "/certifications", label: "Certifications" },
  { href: "/technical-skills", label: "Technical Skills" },
  { href: "/experience-leadership", label: "Experience & Leadership" },
  { href: "/github-integration", label: "Public Repositories" },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-line/80 bg-void/60">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center border border-line-hi bg-panel/60 font-mono text-[11px] tracking-[0.14em] text-accent">
                {site.initials}
                <span className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent/70" />
                <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-accent/70" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{site.name}</p>
                <p className="label-xs mt-1 text-faint">{site.role}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-faint">
              {site.program}. {site.university}. Focused on intelligent systems, edge navigation and
              applied machine learning research.
            </p>
            <p className="label-xs mt-6 flex items-center gap-2 text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {site.location}
            </p>
          </div>

          <nav aria-label="Portfolio sections">
            <h2 className="label text-mist">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-faint transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Portfolio index">
            <h2 className="label text-mist">Index</h2>
            <ul className="mt-5 space-y-3">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-faint transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-mist">Connect</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-faint transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-faint transition-colors hover:text-accent"
                >
                  Hugging Face
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-faint transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-[13px] text-faint transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-faint transition-colors hover:text-accent"
                >
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line/70 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label-xs text-faint">
            © {new Date().getFullYear()} {site.name} — All rights reserved
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label-xs flex items-center gap-2 text-faint">
              <span className="h-1 w-1 rounded-full bg-accent/70" />
              Bengaluru · IST
            </span>
            <Link
              href="/privacy-policy"
              className="label-xs text-faint transition-colors hover:text-accent"
            >
              Privacy Policy
            </Link>
            <span className="label-xs text-faint">Build 2026.11</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
