import { Router } from "express";
import { fetchProfile, fetchRepos, fetchReadme } from "../services/github.js";
import { remember } from "../services/cache.js";

const router = Router();

const TTL = Number(process.env.CACHE_TTL_SECONDS || 600);
const USERNAME = process.env.GITHUB_USERNAME || "eduualvesss";
const REPO_NAME_RE = /^[A-Za-z0-9._-]+$/;

function respondWithMeta(res, result) {
  res.set("X-Data-Source", result.source);
  if (result.error) {
    res.set("X-Upstream-Warning", "Serving cached data because GitHub did not respond.");
  }
  res.set(
    "Cache-Control",
    result.source === "stale-cache" || result.error
      ? "no-store"
      : "public, s-maxage=300, stale-while-revalidate=600"
  );
  res.json(result.data);
}

router.get("/profile", async (req, res, next) => {
  try {
    const result = await remember(`profile:${USERNAME}`, TTL, () => fetchProfile(USERNAME));
    respondWithMeta(res, result);
  } catch (err) {
    next(err);
  }
});

router.get("/repos", async (req, res, next) => {
  try {
    const includeForks = req.query.includeForks === "true";
    const result = await remember(`repos:${USERNAME}`, TTL, () => fetchRepos(USERNAME));
    const data = includeForks ? result.data : result.data.filter((repo) => !repo.isFork);
    respondWithMeta(res, { ...result, data });
  } catch (err) {
    next(err);
  }
});

router.get("/repos/:owner/:repo/readme", async (req, res, next) => {
  try {
    const { owner, repo } = req.params;
    if (owner.toLowerCase() !== USERNAME.toLowerCase()) {
      return res.status(403).json({ error: "Only repositories owned by this portfolio can be read." });
    }
    if (!REPO_NAME_RE.test(repo) || repo.includes("..")) {
      return res.status(400).json({ error: "Invalid repository name." });
    }
    const cacheKey = `readme:${USERNAME.toLowerCase()}/${repo.toLowerCase()}`;
    const result = await remember(cacheKey, TTL, () => fetchReadme(USERNAME, repo));
    respondWithMeta(res, result);
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ error: "This repository has no README." });
    }
    next(err);
  }
});

export default router;
