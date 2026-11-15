"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections, site } from "@/lib/content";

type IconProps = { className?: string };

const icons: Record<string, (props: IconProps) => React.ReactElement> = {
  top: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.2" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 1.4v2.6M10 16v2.6M1.4 10h2.6M16 10h2.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  about: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.1" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10" cy="6.4" r="0.9" fill="currentColor" />
    </svg>
  ),
  projects: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2.4 17 6.6v6.8L10 17.6 3 13.4V6.6l7-4.2Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 6.6 10 11l7-4.4M10 11v6.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  research: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7.5 2.6v5L3.4 15a1.6 1.6 0 0 0 1.3 2.4h10.6A1.6 1.6 0 0 0 16.6 15L12.5 7.6v-5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6.2 2.6h7.6M6 11.4h8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  lab: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="10" cy="10" rx="8" ry="3.4" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="10" cy="10" rx="3.4" ry="8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  beyond: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2.2 11.7 8l5.9 1.7-5.9 1.7L10 17.4 8.3 11.4 2.4 9.7 8.3 8 10 2.2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  ),
  contact: ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.4" y="4.2" width="15.2" height="11.6" rx="1.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="m3.2 5.2 6.8 5.2 6.8-5.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
};

const routeSection: Record<string, string> = {
  "/": "top",
  "/about": "about",
  "/projects": "projects",
  "/project": "projects",
  "/research": "research",
  "/engineering-lab": "lab",
  "/beyond-the-code": "beyond",
  "/contact": "contact",
  "/achievements": "about",
  "/certifications": "about",
  "/technical-skills": "about",
  "/experience-leadership": "about",
  "/github-integration": "projects",
  "/privacy-policy": "contact",
  "/admin": "contact",
};

function sectionHref(id: string) {
  return id === "top" ? "/" : `/#${id}`;
}

export const Navigation = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);

  const baseRoute = `/${pathname.split("/").filter(Boolean)[0] ?? ""}`;
  const routeKey = baseRoute === "/" ? "/" : baseRoute;
  const pageSection = routeSection[routeKey] ?? "top";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.15, 0.4, 0.75] }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, pageSection]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const activeId = pathname === "/" ? active : pageSection;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-abyss/80 backdrop-blur-xl"
            : "border-b border-line/40 bg-abyss/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Mummaka Sanjana Reddy — home">
            <span className="relative flex h-9 w-9 items-center justify-center border border-line-hi bg-panel/60 font-mono text-[10px] tracking-[0.14em] text-accent transition-colors duration-300 group-hover:border-accent/70">
              {site.initials}
              <span className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent/70" />
              <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-accent/70" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-medium tracking-[0.02em] text-ink sm:text-sm">
                {site.name}
              </span>
              <span className="label-xs mt-1 hidden text-faint sm:block">
                {site.role} · Portfolio
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="label-xs hidden items-center gap-2 text-mist xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-accent" />
                <span className="ping-ring absolute inset-0 rounded-full bg-accent" />
              </span>
              Open to AI/ML opportunities
            </span>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hidden px-5 py-2.5 sm:inline-flex"
            >
              Résumé
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v7M3 5.4 6 8.4l3-3M2 10.2h8" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="flex h-10 w-10 items-center justify-center border border-line-hi text-mist transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                {menuOpen ? (
                  <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.3" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.3" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-nav"
            className="border-t border-line/80 bg-abyss/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Sections" className="mx-auto max-w-[1440px] px-5 py-4 md:px-8">
              <ul className="divide-y divide-line/60">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <Link
                      href={sectionHref(section.id)}
                      onClick={() => setMenuOpen(false)}
                      aria-current={activeId === section.id ? "true" : undefined}
                      className={`flex items-center justify-between py-3.5 text-sm transition-colors ${
                        activeId === section.id ? "text-accent" : "text-mist hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="label-xs text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.label}
                      </span>
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.1" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-4 w-full"
              >
                View Résumé
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* persistent mission rail */}
      <nav
        aria-label="Section navigation"
        className="fixed left-4 top-1/2 z-[60] hidden -translate-y-1/2 lg:block"
      >
        <div className="nav-rail flex flex-col items-center gap-1 rounded-full px-2 py-3">
          <span className="mb-1 h-4 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" />
          {sections.map((section, index) => {
            const Icon = icons[section.id];
            const isActive = activeId === section.id;
            return (
              <Link
                key={section.id}
                href={sectionHref(section.id)}
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${section.label} — ${String(index + 1).padStart(2, "0")} of ${String(
                  sections.length
                ).padStart(2, "0")}`}
                className="rail-btn group"
              >
                <Icon className="h-[17px] w-[17px]" />
                <span className="rail-tip label-xs">{section.label}</span>
              </Link>
            );
          })}
          <span className="mt-1 h-4 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
