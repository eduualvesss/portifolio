import { projectsSection } from "../content.js";
import ProjectRow from "./ProjectRow.jsx";
import SkeletonRow from "./SkeletonRow.jsx";
import "../styles/projects.css";

export default function ProjectsSection({ status, projects, isStale }) {
  return (
    <section id="projects" className="projects">
      <div className="wrap">
        <p className="eyebrow">{projectsSection.eyebrow}</p>
        <h2 className="section-heading">{projectsSection.heading}</h2>
        <p className="section-lede">{projectsSection.description}</p>

        {isStale && status === "loaded" && (
          <p className="notice-bar">{projectsSection.errorState}</p>
        )}

        <div className="ledger" role="list">
          {status === "loading" && (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}

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
