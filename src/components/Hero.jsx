import { hero, specSheet, profile } from "../content.js";
import "../styles/hero.css";

export default function Hero({ liveStats }) {
  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__headline">{hero.headline}</h1>
          <p className="hero__subhead">{hero.subhead}</p>
          <div className="hero__actions">
            <a className="hero__button" href="#projects">
              View projects
            </a>
            <a className="hero__link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              github.com/{profile.githubUsername}
            </a>
          </div>
        </div>

        <dl className="spec-block" aria-label="Summary">
          <div className="spec-block__title">SPEC</div>
          {specSheet.map((row) => (
            <div className="spec-block__row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          <div className="spec-block__row spec-block__row--live">
            <dt>GitHub</dt>
            <dd>
              {liveStats
                ? `${liveStats.publicRepos} public repos, ${liveStats.followers} followers`
                : "Loading live stats..."}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
