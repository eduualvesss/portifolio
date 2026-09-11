import "../styles/tape.css";

// Duplicated once so the loop has no visible seam. aria-hidden: this is
// a decorative restatement of info that's already in the page as text.
export default function TechTape({ items, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div className="tape" aria-hidden="true">
      <div className={`tape__track${reverse ? " tape__track--reverse" : ""}`}>
        {doubled.map((item, i) => (
          <span className="tape__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
