import { useEffect, useState } from "react";
import { footer, profile } from "../content.js";

export default function Footer() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "America/Recife",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span>
          {profile.name}, {new Date().getFullYear()}
        </span>
        <span>
          {footer.note} <span className="site-footer__clock-time">{time}</span> Recife
        </span>
      </div>
    </footer>
  );
}
