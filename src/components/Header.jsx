import { useEffect, useState } from "react";
import { profile } from "../content.js";
import "../styles/header.css";

const NAV_ITEMS = [
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "about", href: "#about", label: "About" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);

      if (window.scrollY < 160) {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = item.id;
        }
      }
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__inner">
        <div className="site-header__brand">
          <a href="#top" className="site-header__mark">
            {profile.name.toUpperCase()}
          </a>
          <span className="site-header__status">
            <span className="site-header__status-dot" aria-hidden="true" />
            OPEN TO INTERNSHIP
          </span>
        </div>
        <nav aria-label="Primary">
          <ul className="site-header__nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={isActive ? "is-active" : undefined}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
