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
  // TODO: fill these in with your real contact details before sending
  // this to anyone.
  email: "alvesnunescarloseduardo@gmail.com.com",
  linkedinUrl: "https://www.linkedin.com/in/eduualvesss/",
};

// Repo names (case-insensitive) to hide from the project ledger, on top
// of your profile README repo which is always excluded. Add this site's
// own repo name here so it doesn't list itself as one of its projects.
export const excludedRepos = ["portifolio"];

export const hero = {
  eyebrow: "Portfolio / Rev. 2026.2",
  headline: "I build the parts of a product nobody else sees.",
  subhead:
    "Systems Analysis and Development student and back-end developer based in Recife, Brazil, currently on the hunt for a back-end internship. I spend most of my time on APIs, data and the systems underneath them, and the rest of it taking hardware apart to see how it fails.",
};

// Key-value pairs rendered as a datasheet-style spec block next to the
// hero. Edit freely: add, remove or reorder rows.
export const specSheet = [
  { label: "Focus", value: "Back-end APIs and systems" },
  { label: "Toolkit", value: "Java, C, C++, C#, JavaScript, Node.js" },
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
export const toolkitTape = ["NODE.JS", "EXPRESS", "POSTGRESQL", "JAVA", "C", "C++", "C#", "JWT AUTH", "REST APIS", "GIT"];
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
    "Everything below is fetched from GitHub at request time by this site's own back end, not hand-typed. Forks and this profile's README repository are filtered out.",
  emptyState: "No repositories matched the current filters.",
  errorState: "GitHub did not respond in time. Showing the most recent data this site had cached.",
};

export const contact = {
  heading: "Contact",
  description:
    "The fastest way to reach me is by email. I also read anything sent through GitHub.",
};

export const footer = {
  note: "Built with React, Express and the GitHub REST API.",
};
