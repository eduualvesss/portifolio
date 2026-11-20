// Frontend and API are deployed as one Vercel project, so these are
// always same-origin, relative requests. No base URL to configure.

async function get(path, { signal } = {}) {
  const res = await fetch(path, { signal });
  const isStale = res.headers.get("X-Data-Source") === "stale-cache";

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }

  const data = await res.json();
  return { data, isStale };
}

export function getProfile(options) {
  return get("/api/profile", options);
}

export function getRepos(options) {
  return get("/api/repos", options);
}

export function getReadme(owner, repo, options) {
  return get(`/api/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, options);
}
