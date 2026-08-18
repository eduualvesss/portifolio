import { useState } from "react";
import { getReadme } from "../api.js";
import { timeAgo, isRecentlyActive } from "../utils/formatDate.js";
import { profile } from "../content.js";

export default function ProjectRow({ project, index }) {
  const [readme, setReadme] = useState(null);
  const [readmeStatus, setReadmeStatus] = useState("idle"); // idle | loading | loaded | error
  const [expanded, setExpanded] = useState(false);

  const partNumber = `EA-${String(index + 1).padStart(2, "0")}`;
  const active = isRecentlyActive(project.updatedAt);

  async function handleToggleReadme() {
    if (!expanded && readmeStatus === "idle") {
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
    <div className="ledger-row">
      <div className="ledger-row__top">
        <span className="ledger-row__id">{partNumber}</span>

        <div className="ledger-row__main">
          <div className="ledger-row__title-line">
            <h3 className="ledger-row__title">{project.name}</h3>
            <span className={`status-tag ${active ? "status-tag--live" : "status-tag--stale"}`}>
              {active ? "ACTIVE" : "ARCHIVED"}
            </span>
          </div>
          <p className="ledger-row__desc">
            {project.description || "No description provided in the repository."}
          </p>
          {project.topics.length > 0 && (
            <p className="ledger-row__topics">
              {project.topics.map((topic) => `#${topic}`).join("  ")}
            </p>
          )}
        </div>

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
      </div>

      <div className="ledger-row__actions">
        {project.homepage && (
          <a className="ledger-row__action ledger-row__action--primary" href={project.homepage} target="_blank" rel="noreferrer">
            View live
          </a>
        )}
        <a className="ledger-row__action" href={project.repoUrl} target="_blank" rel="noreferrer">
          Source
        </a>
        <button className="ledger-row__action ledger-row__action--button" onClick={handleToggleReadme}>
          {expanded ? "Hide README" : "Read the docs"}
        </button>
      </div>

      {expanded && (
        <div className="readme-panel">
          {readmeStatus === "loading" && <p className="readme-panel__status">Loading README...</p>}
          {readmeStatus === "error" && (
            <p className="readme-panel__status">Could not load this README right now.</p>
          )}
          {readmeStatus === "loaded" && <pre className="readme-panel__content">{readme}</pre>}
        </div>
      )}
    </div>
  );
}
