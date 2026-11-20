import { useEffect, useMemo, useState } from "react";
import { projectsSection } from "../content.js";
import ProjectRow from "./ProjectRow.jsx";
import LedgerStatus from "./LedgerStatus.jsx";
import Reveal from "./Reveal.jsx";
import "../styles/projects.css";

export default function ProjectsSection({ status, projects, isStale, onRetry }) {
  const [activeLang, setActiveLang] = useState("ALL");

  const languageTabs = useMemo(() => {
    const counts = new Map();
    for (const p of projects) {
      if (!p.language) continue;
      counts.set(p.language, (counts.get(p.language) || 0) + 1);
    }
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return [["ALL", projects.length], ...sorted];
  }, [projects]);

  useEffect(() => {
    if (activeLang !== "ALL" && !languageTabs.some(([lang]) => lang === activeLang)) {
      setActiveLang("ALL");
    }
  }, [activeLang, languageTabs]);

  const visibleProjects = useMemo(() => {
    if (activeLang === "ALL") return projects;
    return projects.filter((p) => p.language === activeLang);
  }, [projects, activeLang]);

  const counterText = `${String(visibleProjects.length).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} · ${
    activeLang === "ALL" ? "CURATED" : activeLang.toUpperCase()
  }`;

  return (
    <section id="projects" className="projects">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          {projectsSection.eyebrow}
        </Reveal>
        <Reveal as="h2" className="section-heading" delay={0.08}>
          {projectsSection.heading}
        </Reveal>
        <Reveal as="p" className="section-lede" delay={0.16}>
          {projectsSection.description}
        </Reveal>

        {isStale && status === "loaded" && (
          <p className="notice-bar">{projectsSection.staleState}</p>
        )}

        {status === "error" && (
          <div className="notice-bar notice-bar--error">
            <span>{projectsSection.errorState}</span>
            {onRetry && (
              <button type="button" className="notice-bar__retry" onClick={onRetry}>
                {projectsSection.retryLabel}
              </button>
            )}
          </div>
        )}

        {projects.length > 0 && (
          <div className="ledger-toolbar">
            <div className="filter-group" role="group" aria-label="Filter projects by stack">
              {languageTabs.map(([lang, count]) => {
                const isActive = activeLang === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    aria-pressed={isActive}
                    className={`filter-pill${isActive ? " is-active" : ""}`}
                    onClick={() => setActiveLang(lang)}
                  >
                    {lang.toUpperCase()} ({count})
                  </button>
                );
              })}
            </div>
            <span className="ledger-count">{counterText}</span>
          </div>
        )}

        <div className="ledger" role="list">
          {status === "loading" && <LedgerStatus label="FETCHING REPOSITORY LEDGER" />}

          {status === "loaded" && projects.length === 0 && (
            <p className="notice-bar">{projectsSection.emptyState}</p>
          )}

          {visibleProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              immediate={activeLang !== "ALL"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
