import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import reposRouter from "./routes/repos.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// No app.listen() here. Vercel imports this file's default export and
// calls it directly as the request handler for every request under
// /api/* (see vercel.json). Locally, run `vercel dev` to get the same
// behaviour on your machine instead of a plain `node` process.

const app = express();

// Protects this API from abuse, independent of GitHub's own rate limit.
// Note: on Vercel this counter lives in the memory of a single warm
// function instance. Under real concurrent traffic, multiple instances
// may run in parallel, each with its own counter, so this is a
// best-effort guard rather than a hard global limit. A portfolio's
// traffic never gets close to that edge case; a product API would use
// a shared store (Redis, Upstash) instead.
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", reposRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
