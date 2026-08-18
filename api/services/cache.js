// Small in-memory cache with a time-to-live per key.
//
// Why this exists: the GitHub REST API allows 60 unauthenticated requests
// per hour, per IP. A portfolio site that calls it on every page load would
// hit that ceiling almost immediately once more than a couple of people
// (or one interviewer refreshing the page) look at it. Caching each
// response for a few minutes keeps the site fast and keeps it working even
// if GitHub is slow or temporarily unavailable.

const store = new Map();

/**
 * Read a cache entry. Returns { value, isStale } where isStale is true once
 * the entry has passed its TTL but has not yet been overwritten, so callers
 * can decide to serve it anyway as a fallback.
 */
export function get(key) {
  const entry = store.get(key);
  if (!entry) return null;
  const isStale = Date.now() > entry.expiresAt;
  return { value: entry.value, isStale };
}

export function set(key, value, ttlSeconds) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Fetch-through helper: return the cached value if it is still fresh,
 * otherwise call `loader`. If `loader` throws and a stale copy exists,
 * serve the stale copy rather than failing the request outright.
 */
export async function remember(key, ttlSeconds, loader) {
  const cached = get(key);
  if (cached && !cached.isStale) {
    return { data: cached.value, source: "cache" };
  }

  try {
    const fresh = await loader();
    set(key, fresh, ttlSeconds);
    return { data: fresh, source: "network" };
  } catch (err) {
    if (cached) {
      // Upstream failed, but we have something to show. Serve it and let
      // the caller flag the response as stale instead of erroring out.
      return { data: cached.value, source: "stale-cache", error: err };
    }
    throw err;
  }
}
