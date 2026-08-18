import { about } from "../content.js";
import "../styles/about.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap about__grid">
        <h2 className="section-heading">{about.heading}</h2>
        <div className="about__body">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
