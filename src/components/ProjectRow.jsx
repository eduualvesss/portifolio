import { useState } from "react";
import { getReadme } from "../api.js";
import { timeAgo, isRecentlyActive } from "../utils/formatDate.js";
import { profile } from "../content.js";
import { useReveal } from "../hooks/useReveal.js";
import MarkdownView from "./MarkdownView.jsx";

export default function ProjectRow({ project, index, immediate = false }) {
  const [readme, setReadme] = useState(null);
  const [readmeStatus, setReadmeStatus] = useState("idle"); // idle | loading | loaded | error
  const [expanded, setExpanded] = useState(false);
  const [revealRef, revealVisible] = useReveal();

  const partNumber = `EA-${String(index + 1).padStart(2, "0")}`;
  const isPrivate = Boolean(project.isPrivate);
  const active = isPrivate || isRecentlyActive(project.updatedAt);
  const isVisible = immediate || revealVisible;

  async function handleToggleDocs() {
    if (isPrivate) {
      setExpanded((v) => !v);
      return;
    }

    if (!expanded && (readmeStatus === "idle" || readmeStatus === "error")) {
      setReadmeStatus("loading");
      try {
        const { data } = await getReadme(profile.githubUsername, project.name);
        setReadme(data.content);
        setReadmeStatus("loaded");
      } catch (err) {
        setReadmeStatus("error");
      }
    }
    setExpanded((v) => !v);
  }

  return (
    <div
      ref={revealRef}
      role="listitem"
      className={`ledger-row reveal${isVisible ? " is-visible" : ""}`}
      style={{ "--reveal-delay": immediate ? "0s" : `${Math.min(index, 6) * 0.07}s` }}
    >
      <div className="ledger-row__top">
        <span className="ledger-row__id">{partNumber}</span>

        <div className="ledger-row__main">
          <div className="ledger-row__title-line">
            <h3 className="ledger-row__title">{project.name}</h3>
            {isPrivate ? (
              <span className="status-tag status-tag--private">
                {project.statusLabel || "CLOSED SOURCE"}
              </span>
            ) : (
              <span className={`status-tag ${active ? "status-tag--live" : "status-tag--stale"}`}>
                {active ? "ACTIVE" : "ARCHIVED"}
              </span>
            )}
          </div>
          <p className="ledger-row__desc">
            {project.description || "No description provided in the repository."}
          </p>
          {project.topics?.length > 0 && (
            <div className="ledger-row__topics">
              {project.topics.map((topic) => (
                <span className="ledger-row__topic" key={topic}>
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {isPrivate ? (
          <dl className="ledger-row__meta">
            <div>
              <dt>Stack</dt>
              <dd>{project.language || "Node.js"}</dd>
            </div>
            <div>
              <dt>Access</dt>
              <dd>{project.accessLabel || "Closed source"}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{project.contextLabel || "Private"}</dd>
            </div>
          </dl>
        ) : (
          <dl className="ledger-row__meta">
            <div>
              <dt>Lang</dt>
              <dd>{project.language || "n/a"}</dd>
            </div>
            <div>
              <dt>Stars</dt>
              <dd>{project.stars}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{timeAgo(project.updatedAt)}</dd>
            </div>
          </dl>
        )}
      </div>

      <div className="ledger-row__actions">
        {isPrivate ? (
          <>
            <span className="ledger-row__restricted">Private repository · Source restricted</span>
            {project.inlineReadme && (
              <button
                type="button"
                className="ledger-row__action ledger-row__action--button"
                aria-expanded={expanded}
                onClick={handleToggleDocs}
              >
                {expanded ? "Hide overview" : "Architecture notes"}
              </button>
            )}
          </>
        ) : (
          <>
            {project.homepage && (
              <a
                className="ledger-row__action ledger-row__action--primary"
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                View live
              </a>
            )}
            <a
              className="ledger-row__action"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
            <button
              type="button"
              className="ledger-row__action ledger-row__action--button"
              aria-expanded={expanded}
              onClick={handleToggleDocs}
            >
              {expanded ? "Hide README" : "Read the docs"}
            </button>
          </>
        )}
      </div>

      {expanded && (
        <div className="readme-panel">
          {isPrivate ? (
            <MarkdownView content={project.inlineReadme} />
          ) : (
            <>
              {readmeStatus === "loading" && <p className="readme-panel__status">Loading README...</p>}
              {readmeStatus === "error" && (
                <p className="readme-panel__status">Could not load this README right now.</p>
              )}
              {readmeStatus === "loaded" && <MarkdownView content={readme} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
