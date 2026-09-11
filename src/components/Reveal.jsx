import { useReveal } from "../hooks/useReveal.js";

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  const classes = ["reveal", visible ? "is-visible" : null, className || null].filter(Boolean).join(" ");

  return (
    <Tag ref={ref} className={classes} style={{ "--reveal-delay": `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}
