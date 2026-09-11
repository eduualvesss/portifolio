import { projectsSection } from "../content.js";
import ProjectRow from "./ProjectRow.jsx";
import LedgerStatus from "./LedgerStatus.jsx";
import Reveal from "./Reveal.jsx";
import "../styles/projects.css";

export default function ProjectsSection({ status, projects, isStale }) {
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
          <p className="notice-bar">{projectsSection.errorState}</p>
        )}

        <div className="ledger" role="list">
          {status === "loading" && <LedgerStatus label="FETCHING REPOSITORY LEDGER" />}

          {status === "error" && <p className="notice-bar notice-bar--error">{projectsSection.errorState}</p>}

          {status === "loaded" && projects.length === 0 && (
            <p className="notice-bar">{projectsSection.emptyState}</p>
          )}

          {status === "loaded" &&
            projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
