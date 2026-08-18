# Eduardo Alves, Portfolio

One Vercel project, deployed straight from GitHub. The `src/` folder is a
React site; `api/` is an Express app that Vercel runs as a single
serverless function. No project data is hand-typed anywhere: it is
fetched live, on every request, from `github.com/eduualvesss`.

```
├── api/          Express app (fetches, caches, and serves GitHub data)
│   ├── index.js       entry point Vercel runs as a Function
│   ├── routes/
│   ├── services/       GitHub client + in-memory cache
│   └── middleware/
├── src/          React site (pages, components, styles)
├── index.html
├── vercel.json    routes /api/* to the function above
└── package.json
```

Frontend and API are served from the same domain once deployed, so the
site just calls `/api/repos`, no separate backend URL to configure.

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

(Create the empty repo on GitHub first, then run the commands above from
inside this folder.)

**2. Import it on Vercel**

- Go to [vercel.com/new](https://vercel.com/new) and import that GitHub
  repo. Vercel detects the Vite frontend and the `api/` function on its
  own; you don't need to change any build settings.
- Before the first deploy, open **Environment Variables** and add:
  - `GITHUB_USERNAME` = `eduualvesss`
  - `GITHUB_TOKEN` = *(optional, recommended)* a
    [personal access token](https://github.com/settings/tokens) with no
    scopes checked. This raises GitHub's rate limit from 60 to 5,000
    requests/hour. Without it, the site still works, it just has less
    headroom before it starts serving cached data.
- Click **Deploy**. You'll get a live URL in about a minute
  (`your-project.vercel.app`).

Every subsequent `git push` to `main` redeploys automatically.

## Before you send this anywhere

Open `src/content.js`. It is the one file holding all of the site's
personal copy, headline, about section, email, LinkedIn. Read it over
and fill in your real contact details; I only had what came up in our
conversation and what's public on your GitHub profile to go on.

## Running it locally (optional)

You mostly don't need this, Vercel builds and hosts it for you, but if
you want to check something before pushing:

```bash
npm install -g vercel   # once
vercel login             # once
npm install
vercel dev
```

`vercel dev` runs the site and the `api/` function together exactly as
Vercel does in production. Add a `.env` file (copy `.env.example`) for
your local `GITHUB_TOKEN` if you have one.

## Talking points for an interview

- **One repo, one deploy, two runtimes.** `src/` builds to static
  assets; `api/index.js` becomes a serverless function. `vercel.json`'s
  one rewrite rule is what ties a single Express app to every `/api/*`
  path.
- **Caching with a stale fallback.** `api/services/cache.js` serves
  fresh data when it has it, and serves the last known-good response,
  flagged as stale, when the upstream GitHub call fails, rather than
  showing a blank page.
- **Two live GitHub endpoints, not one.** The project list comes from
  `/users/:username/repos`; expanding "Read the docs" on any project
  makes a second, separately cached call to `/repos/:owner/:repo/readme`
  and renders the actual file content.
- **Rate limiting in a serverless context.** `api/index.js` rate-limits
  its own routes in memory, and the comment there is honest about the
  tradeoff: on Vercel that counter lives per warm instance, not
  globally. Worth knowing the difference and what you'd reach for
  instead (Redis/Upstash) at real scale.
