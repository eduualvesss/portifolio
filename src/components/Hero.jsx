import { useEffect, useRef } from "react";
import { hero, specSheet, profile } from "../content.js";
import Reveal from "./Reveal.jsx";
import "../styles/hero.css";

const SIGNAL_PATH =
  "M0,45 L120,45 L136,45 L146,12 L156,78 L166,45 L182,45 L420,45 L434,45 L444,20 L452,68 L460,30 L468,58 L476,45 L490,45 L700,45 L714,45 L722,15 L730,45 L740,45 L1000,45";

export default function Hero({ liveStats }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect(); // force layout before the transition starts
    path.style.transition = "stroke-dashoffset 1.8s ease";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, []);

  return (
    <section id="top" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <Reveal as="p" className="eyebrow">
            {hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="hero__headline" delay={0.08}>
            {hero.headline}
          </Reveal>
          <Reveal as="p" className="hero__subhead" delay={0.16}>
            {hero.subhead}
          </Reveal>
          <Reveal as="div" className="hero__actions" delay={0.24}>
            <a className="hero__button" href="#projects">
              View projects
            </a>
            <a className="hero__link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              github.com/{profile.githubUsername}
            </a>
          </Reveal>
        </div>

        <Reveal as="dl" className="spec-block" delay={0.2} aria-label="Summary">
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
        </Reveal>
      </div>

      <div className="wrap signal">
        <svg viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
          <path ref={pathRef} d={SIGNAL_PATH} />
        </svg>
        <div className="signal__caption">
          <span>SIG_01 · uptime trace</span>
          <span>idle → request → response</span>
        </div>
      </div>
    </section>
  );
}
