// Frontend and API are deployed as one Vercel project, so these are
// always same-origin, relative requests. No base URL to configure.

async function get(path) {
  const res = await fetch(path);
  const isStale = res.headers.get("X-Data-Source") === "stale-cache";

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request to ${path} failed (${res.status})`);
  }

  const data = await res.json();
  return { data, isStale };
}

export function getProfile() {
  return get("/api/profile");
}

export function getRepos() {
  return get("/api/repos");
}

export function getReadme(owner, repo) {
  return get(`/api/repos/${owner}/${repo}/readme`);
}
