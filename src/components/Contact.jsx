import { contact, profile } from "../content.js";
import "../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap contact__grid">
        <div>
          <h2 className="section-heading">{contact.heading}</h2>
          <p className="section-lede">{contact.description}</p>
        </div>
        <dl className="contact__list">
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
        </dl>
      </div>
    </section>
  );
}
