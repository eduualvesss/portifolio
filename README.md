# Eduardo Alves, Portfolio

A portfolio site with no hand-typed project list. The project section
you see is fetched live, on every request, from the GitHub REST API by
this repo's own back end, not copied and pasted from GitHub into a
webpage.

**Live:** https://eduualvesss-portifolio.vercel.app/
**GitHub:** https://github.com/eduualvesss

## What this is

Most portfolio sites are static: a project list someone typed once and
forgets to update. This one treats GitHub as the database. `api/index.js`
fetches your starred personal repositories from GitHub's REST API, caches
the response, and serves it to the front end. Star one of your repos on
GitHub, and it shows up here after cache revalidation, nothing to edit,
nothing to redeploy.

That decision, GitHub as the source of truth instead of a hardcoded
array, is what turns this from a static page into an actual full-stack
project: there's a real API to design, real failure modes to handle
(GitHub is rate-limited and occasionally slow), and real state to manage
on the front end (loading, error, and stale-data views).

## Features

- **Live, star-curated project data + closed-source work.** Public
  repos, languages, star counts, and last-updated dates come from
  `GET /api/repos`, backed by `/users/:username/starred` filtered to your
  own repositories, alongside closed-source residency projects such as
  `FarolHUB` documented in `src/content.js` without exposing source code.
- **Stack filters & formatted READMEs.** Visitors can filter the project
  ledger by language (`Java`, `Node.js`, `JavaScript`, `C`, `C++`,
  `PowerShell`) and expand any project's real `README.md` (rendered via
  a lightweight Markdown view) or architecture overview in place through
  the owner-locked `GET /api/repos/:owner/:repo/readme` route.
- **Carbon + Crimson visual system.** Deep obsidian `#080808` substrate
  with frosted carbon glass cards, flat-square stack badges, live GitHub
  avatar integration in the spec card, and surgical crimson signal accents.
- **Multi-layer caching with a stale fallback.** Responses are cached for
  10 minutes server-side (with in-flight request coalescing to avoid cache
  stampedes and an 8s upstream timeout) plus CDN `Cache-Control`
  (`s-maxage=300, stale-while-revalidate=600`) for fresh responses. If
  GitHub is slow or rate-limits the request, the API serves the last good
  response instead of failing outright, marks it `no-store`, and flags it
  as stale so the UI can say so.
- **Loading and error states that are actually built.** Status feedback
  while data is in flight, a visible notice if GitHub doesn't respond,
  not a blank screen either way.

## Tech stack

| Layer | Choice |
|---|---|
| Front end | React 18, Vite 6 |
| Back end | Express 4, deployed as a single Vercel Function |
| Data | GitHub REST API (`/users/:username/starred`, `/repos/:owner/:repo/readme`) |
| Hosting | Vercel (one project, one deploy, both layers) |

## How it's structured

```
├── api/                 Express app, becomes one Vercel Function
│   ├── index.js              entry point + proxy/security headers
│   ├── routes/repos.js       /api/profile, /api/repos, /api/repos/:owner/:repo/readme
│   ├── services/github.js    GitHub API client (8s timeout + starred owner filter)
│   └── services/cache.js     bounded in-memory cache with coalescing & stale fallback
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/                  React site
│   ├── components/           Header, Hero, ProjectsSection, About, Contact
│   └── content.js            all editable personal copy, in one place
├── vercel.json           routes /api/* to the function above
└── index.html
```

## Other projects

These are the curated (starred) repositories currently pulled from
[github.com/eduualvesss](https://github.com/eduualvesss) into the site
above. This list is for context here in the README; on the actual site,
it's generated automatically rather than written out like this.

**[api-de-gestao-e-compartilhamento-de-promocoes](https://github.com/eduualvesss/api-de-gestao-e-compartilhamento-de-promocoes)**, Java
E-commerce catalog and promotions REST API built with Java 17, Spring
Boot 3.3, Spring Data JPA, Strategy-pattern coupon engine, and PostgreSQL.

**[PerformanceReader](https://github.com/eduualvesss/PerformanceReader)**, Java
A client-side Fabric mod for Minecraft that records machine performance
(FPS, TPS, CPU, GPU, RAM, temperature, voltage) via a .NET
LibreHardwareMonitor subprocess with OSHI fallback and exports `.txt`/CSV
diagnostics.

**[FragBoost](https://github.com/eduualvesss/FragBoost)**, PowerShell
Multi-launcher Windows game optimizer GUI with self-elevation, per-game
tweaks, CPU/RAM tools, and automatic registry backup and restore.

**[STUDIUM](https://github.com/eduualvesss/STUDIUM)**, JavaScript
A study notes and schedule app, deployed at
[studium-sand.vercel.app](https://studium-sand.vercel.app).

**[Projeto-Mercadinho](https://github.com/eduualvesss/Projeto-Mercadinho)**, C
A small market/inventory system with struct-based records persisted to
a binary file, no database, just C and file I/O.

**[Projeto-CodeFromScratch](https://github.com/eduualvesss/Projeto-CodeFromScratch)**, C++
A learn-programming-logic project built from scratch, which also
generates a personalized study schedule based on the user's stated
preferences.

## Deploy it

**1. Push this folder to GitHub**

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/eduualvesss/YOUR-REPO-NAME.git
git push -u origin main
```

**2. Import it on Vercel**

At [vercel.com/new](https://vercel.com/new), import the repo. Vercel
detects the Vite front end and the `api/` function on its own. Before
the first deploy, add these under **Environment Variables**:

- `GITHUB_USERNAME` = `eduualvesss`
- `GITHUB_TOKEN` = *(optional, recommended)* a
  [personal access token](https://github.com/settings/tokens) with no
  scopes checked. Raises GitHub's rate limit from 60 to 5,000
  requests/hour.

Every `git push` to `main` after that redeploys automatically.

## Before you send this anywhere

Open `src/content.js`, the one file holding all of the site's personal
copy: headline, about section, email, LinkedIn. Fill in your real
contact details before using this anywhere.

## Running it locally

```bash
npm install -g vercel   # once
vercel login             # once
npm install
vercel dev
```

`vercel dev` runs the site and the `api/` function together, the same
way Vercel does in production.

## Talking points for an interview

- **One repo, one deploy, two runtimes.** `src/` builds to static
  assets; `api/index.js` becomes a serverless function. `vercel.json`'s
  one rewrite rule is what ties a single Express app to every `/api/*`
  path.
- **Caching with a stale fallback**, and why: an unauthenticated client
  hitting GitHub directly gets 60 requests/hour total, shared across
  every visitor. Caching server-side is what makes the site scale past
  one person refreshing the page.
- **Two live GitHub endpoints, not one.** The project list and the
  expandable README each hit a different GitHub route, cached and
  handled independently.
- **Rate limiting in a serverless context**, honestly caveated:
  `api/index.js` rate-limits its own routes in memory, but on Vercel
  that counter lives per warm instance, not globally. Worth knowing the
  difference, and what you'd reach for instead (Redis, Upstash) at real
  scale.
