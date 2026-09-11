import { about } from "../content.js";
import Reveal from "./Reveal.jsx";
import "../styles/about.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap about__grid">
        <Reveal as="h2" className="section-heading">
          {about.heading}
        </Reveal>
        <div className="about__body">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal as="p" key={i} delay={i * 0.08}>
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
