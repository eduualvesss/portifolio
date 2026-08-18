import { footer, profile } from "../content.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span>
          {profile.name}, {new Date().getFullYear()}
        </span>
        <span>{footer.note}</span>
      </div>
    </footer>
  );
}
