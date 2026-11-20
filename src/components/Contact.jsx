import { useEffect, useRef, useState } from "react";
import { contact, profile } from "../content.js";
import Reveal from "./Reveal.jsx";
import "../styles/contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard?.writeText(profile.email);
    } catch {
      /* Ignore clipboard errors if permission is denied. */
    }
    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap contact__grid">
        <div>
          <Reveal as="h2" className="section-heading">
            {contact.heading}
          </Reveal>
          <Reveal as="p" className="section-lede" delay={0.08}>
            {contact.description}
          </Reveal>
        </div>
        <Reveal as="dl" className="contact__list" delay={0.16}>
          <div>
            <dt>Email</dt>
            <dd className="contact__email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                type="button"
                className={`contact__copy-btn${copied ? " is-copied" : ""}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                github.com/{profile.githubUsername}
              </a>
            </dd>
          </div>
          {profile.linkedinUrl && (
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  {profile.linkedinUrl.replace("https://", "")}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
