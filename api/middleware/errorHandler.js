// Central error handler. Keeps error shape consistent and avoids leaking
// stack traces to the client while still logging them server-side.
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 502;

  console.error(`[error] ${req.method} ${req.originalUrl} -> ${status}: ${err.message}`);

  res.status(status).json({
    error:
      status === 403
        ? "GitHub API rate limit reached. Add a GITHUB_TOKEN in the backend .env to raise it."
        : "Could not load data from GitHub right now. Please try again shortly.",
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
}
