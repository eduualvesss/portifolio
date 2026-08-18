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
  eyebrow: "Portfolio / Rev. 2026",
  headline: "I build the parts of a product nobody else sees.",
  subhead:
    "Computer science student and back-end developer based in Recife, Brazil. I spend most of my time on APIs, data and the systems underneath them, and the rest of it taking hardware apart to see how it fails.",
};

// Key-value pairs rendered as a datasheet-style spec block next to the
// hero. Edit freely: add, remove or reorder rows.
export const specSheet = [
  { label: "Focus", value: "Back-end APIs and systems" },
  { label: "Toolkit", value: "Java, C++, JavaScript, Node.js" },
  { label: "Studying", value: "Systems Analysis and Development" },
  { label: "Also into", value: "Hardware diagnostics, PC benchmarking" },
];

export const about = {
  heading: "About",
  paragraphs: [
    "Most of what I build starts from a real, specific problem rather than a blank page. That habit carries over from outside of code too: I have diagnosed a fault on a smart TV's board down to the likely component, reverse-engineered a mechanical keyboard's PCB after four keys stopped registering, and benchmarked and stabilized a secondhand server processor running outside its original spec.",
    "That same approach shapes how I write software. I would rather understand the failure case than avoid it, which is part of why this site's back end is built to keep working, serving cached data, even if GitHub's API is slow or rate-limited.",
    "Outside of engineering, I ride a Honda CB Twister and I am slowly getting better at long-fermentation pizza dough. Both reward the same thing code does: patience with a process you cannot rush.",
  ],
};

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
