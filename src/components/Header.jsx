import { profile } from "../content.js";
import "../styles/header.css";

const NAV_ITEMS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a href="#top" className="site-header__mark">
          {profile.name.toUpperCase()}
        </a>
        <nav aria-label="Primary">
          <ul className="site-header__nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
