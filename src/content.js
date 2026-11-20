// All of the site's personal copy lives here, in one place, so it is easy
// to review and correct before you use this site anywhere. Project data
// itself is not here: that comes live from the backend, which reads it
// straight from the GitHub API.

export const profile = {
  name: "Eduardo Alves",
  role: "Back-end Developer",
  location: "Recife, Pernambuco, Brazil",
  githubUsername: "eduualvesss",
  githubUrl: "https://github.com/eduualvesss",
  email: "alvesnunescarloseduardo@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/eduualvesss/",
};

// Repo names (case-insensitive) to hide from the project ledger, on top
// of your profile README repo which is always excluded. Add this site's
// own repo name here so it doesn't list itself as one of its projects.
export const excludedRepos = ["portifolio"];

export const hero = {
  eyebrow: "Portfolio / Rev. 2026.4",
  headline: "I build the parts of a product nobody else sees.",
  subhead:
    "Systems Analysis and Development student and back-end developer based in Recife, Brazil, currently on the hunt for a back-end internship. I spend most of my time on APIs, data and the systems underneath them, and the rest of it taking hardware apart to see how it fails.",
};

export const heroBadges = ["Java", "Spring Boot", "Node.js", "TypeScript", "PostgreSQL", "C / C++"];

// Key-value pairs rendered as a datasheet-style spec block next to the
// hero. Edit freely: add, remove or reorder rows.
export const specSheet = [
  { label: "Focus", value: "Back-end APIs and systems" },
  { label: "Toolkit", value: "Java, Spring Boot, Node.js, TypeScript, C, C++, PostgreSQL" },
  { label: "Studying", value: "ADS (Systems Analysis & Development), FICR" },
  { label: "Looking for", value: "Back-end internship opportunities" },
  { label: "Also into", value: "Hardware diagnostics, PC benchmarking" },
];

export const about = {
  heading: "About",
  paragraphs: [
    "Most of what I build starts from a real, specific problem rather than a blank page. During a technical residency at Porto Digital's Embarque Digital innovation lab, that meant mapping how people actually used a product before touching its UX, then untangling the back-end rules underneath it. Outside of code, the same instinct shows up: I have diagnosed a fault on a smart TV's board down to the likely component, reverse-engineered a mechanical keyboard's PCB after four keys stopped registering, and benchmarked and stabilized a secondhand server processor running outside its original spec.",
    "That approach carries into the projects below. The oldest is a point-of-sale system for a small market, written in plain C, with a homemade binary encryption layer because I decided the register data deserved better than a text file. The newest is a Node.js and PostgreSQL HR system for Porto Digital, where I ended up as engineering manager for the back end almost by accident, JWT auth, hashed passwords and all.",
    "Outside of engineering, I ride a Honda CB Twister, I am slowly getting better at long-fermentation pizza dough, and I write Minecraft mods that tell me exactly how much my own laptop is suffering. If you happen to be hiring back-end interns in Recife, this paragraph is doing exactly what it looks like it's doing.",
  ],
};

// Two marquee strips reusing the same component: one just below the
// hero, one just above the footer, running the opposite direction.
export const toolkitTape = [
  "JAVA",
  "SPRING BOOT",
  "NODE.JS",
  "EXPRESS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "C",
  "C++",
  "C#",
  "JWT AUTH",
  "REST APIS",
  "GIT",
];
export const signoffTape = [
  "OPEN TO BACK-END INTERNSHIPS",
  "RECIFE, BRAZIL",
  "JAVA",
  "NODE.JS",
  "C",
  "C++",
  "C#",
  "REPLIES FASTER THAN MY API DOES",
];

export const projectsSection = {
  heading: "Projects",
  eyebrow: "Live from the GitHub API",
  description:
    "Public repositories are fetched live from the GitHub API (curated via stars); private residency work such as FarolHUB is documented here without exposing source code.",
  emptyState: "No repositories matched the current filters.",
  staleState: "GitHub did not respond in time. Showing the most recent data this site had cached.",
  errorState: "GitHub did not respond in time and no cached data is available right now. Please refresh shortly.",
  retryLabel: "Retry",
};

// Closed-source or proprietary residency projects shown in the ledger
// without exposing any source code repository URL.
export const privateProjects = [
  {
    id: "private-farolhub",
    name: "FarolHUB",
    isPrivate: true,
    statusLabel: "CLOSED SOURCE",
    description:
      "HR management platform developed during a technical residency at Porto Digital. Responsible for the back-end architecture: Node.js/Express REST API, PostgreSQL on Neon, JWT authentication, bcrypt password hashing, role-based access control, and audit logging.",
    language: "Node.js",
    topics: ["nodejs", "express", "postgresql", "jwt", "porto-digital", "closed-source"],
    accessLabel: "Closed source",
    contextLabel: "Porto Digital",
    updatedAt: "2026-11-17T03:04:23Z",
    inlineReadme: `# FarolHUB — Closed-Source HR Platform (Porto Digital)

Proprietary HR management platform built during a technical residency at **Porto Digital**, where I led the back-end architecture and implementation.

## Back-end Architecture

- **Runtime & API:** \`Node.js\` + \`Express\` REST API
- **Database:** \`PostgreSQL\` hosted on \`Neon\`
- **Security:** Stateless \`JWT\` authentication, \`bcrypt\` password hashing, account approval workflows, and role-based permissions
- **Traceability:** Structured \`audit log\` tracking sensitive HR and administrative operations

## Covered Product Domains

- **Authentication & Onboarding:** Login, registration requests, password recovery, and admin account approval
- **People Management:** Employee directory, individual records, org chart, and document attachments
- **HR Routines & Benefits:** Vacation scheduling, medical certificates/INSS, ASO health tracking, health plan, transit, and Pluxee benefits
- **Governance & Analytics:** Cost centers, turnover indicators, management workflows, reports, and system audit logs

> **Repository access:** This project's production codebase is private/proprietary and is intentionally omitted from public source links.`,
  },
];

// Fallback descriptions and topics for public GitHub repositories when
// those fields are omitted on GitHub. Live GitHub metadata still wins
// whenever present.
export const projectOverrides = {
  "api-de-gestao-e-compartilhamento-de-promocoes": {
    description:
      "E-commerce catalog and promotions REST API built with Java 17, Spring Boot 3.3, Spring Data JPA, Strategy-pattern coupon/discount engine, pessimistic stock locking, and PostgreSQL.",
    topics: ["java-17", "spring-boot", "postgresql", "jpa", "strategy-pattern", "rest-api"],
  },
  performancereader: {
    topics: ["java", "minecraft-fabric", "dotnet", "telemetry", "gradle"],
  },
  fragboost: {
    topics: ["powershell", "winforms", "windows-optimization", "registry-backup"],
  },
  studium: {
    topics: ["javascript", "html-css", "github-api", "local-storage"],
  },
  "projeto-mercadinho": {
    topics: ["c", "binary-io", "pos-system", "inventory"],
  },
  "projeto-codefromscratch": {
    topics: ["cpp", "programming-logic", "study-planner"],
  },
};

export const contact = {
  heading: "Contact",
  description:
    "The fastest way to reach me is by email. I also read anything sent through GitHub.",
};

export const footer = {
  note: "Built with React, Express and the GitHub REST API.",
};
