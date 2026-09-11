import { contact, profile } from "../content.js";
import Reveal from "./Reveal.jsx";
import "../styles/contact.css";

export default function Contact() {
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
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                github.com/{profile.githubUsername}
              </a>
            </dd>
          </div>
          {profile.linkedinUrl && (
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
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
