import { Fragment } from "react";

const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

function getSafeHref(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return SAFE_URL_PROTOCOLS.has(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}

function renderInline(text, keyPrefix) {
  const tokenRe = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let idx = 0;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;

    if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code className="md-inline-code" key={key}>
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      const safeHref = linkMatch ? getSafeHref(linkMatch[2].trim()) : null;
      if (linkMatch && safeHref) {
        const isMail = safeHref.startsWith("mailto:");
        parts.push(
          <a
            key={key}
            className="md-link"
            href={safeHref}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        parts.push(linkMatch ? linkMatch[1] : token);
      }
    }

    lastIndex = tokenRe.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.map((part, i) => <Fragment key={`${keyPrefix}-f-${i}`}>{part}</Fragment>);
}

function isBadgeOnlyLine(line) {
  const trimmed = line.trim();
  return /^(!\[[^\]]*\]\([^)]+\)\s*)+$/.test(trimmed) || /^\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)$/.test(trimmed);
}

function parseBlocks(markdown) {
  const cleaned = (markdown || "").replace(/<!--[\s\S]*?-->/g, "");
  const lines = cleaned.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed || isBadgeOnlyLine(trimmed)) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", text: codeLines.join("\n") });
      continue;
    }

    const headingMatch = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      blocks.push({ type: "heading", level: headingMatch[1].length, text: headingMatch[2] });
      i += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paraLines = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (
        !current ||
        isBadgeOnlyLine(current) ||
        current.startsWith("```") ||
        /^(#{1,4})\s+/.test(current) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(current) ||
        current.startsWith(">") ||
        /^[-*]\s+/.test(current) ||
        /^\d+\.\s+/.test(current)
      ) {
        break;
      }
      paraLines.push(current);
      i += 1;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

export default function MarkdownView({ content }) {
  const blocks = parseBlocks(content);

  return (
    <div className="md-view">
      {blocks.map((block, index) => {
        const key = `md-${index}`;
        if (block.type === "heading") {
          const level = Math.min(block.level, 3);
          return (
            <h4 key={key} className={`md-heading md-heading--${level}`}>
              {renderInline(block.text, key)}
            </h4>
          );
        }
        if (block.type === "hr") {
          return <hr key={key} className="md-hr" />;
        }
        if (block.type === "code") {
          return (
            <pre key={key} className="md-code-block">
              <code>{block.text}</code>
            </pre>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={key} className="md-quote">
              {renderInline(block.text, key)}
            </blockquote>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={key} className="md-list">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={key} className="md-list md-list--ordered">
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={key} className="md-p">
            {renderInline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
