const GITHUB_API = "https://api.github.com";

function authHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-backend",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch(path) {
  const res = await fetch(`${GITHUB_API}${path}`, { headers: authHeaders() });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error = new Error(body.message || `GitHub request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export async function fetchProfile(username) {
  const user = await githubFetch(`/users/${username}`);
  return {
    username: user.login,
    name: user.name,
    bio: user.bio,
    avatarUrl: user.avatar_url,
    location: user.location,
    followers: user.followers,
    following: user.following,
    publicRepos: user.public_repos,
    profileUrl: user.html_url,
  };
}

export async function fetchRepos(username) {
  const repos = await githubFetch(`/users/${username}/repos?per_page=100&sort=pushed`);

  return repos
    .filter((repo) => !repo.private)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isFork: repo.fork,
      homepage: repo.homepage || null,
      repoUrl: repo.html_url,
      updatedAt: repo.pushed_at,
      createdAt: repo.created_at,
      defaultBranch: repo.default_branch,
    }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export async function fetchReadme(owner, repo) {
  const data = await githubFetch(`/repos/${owner}/${repo}/readme`);
  const content = Buffer.from(data.content, data.encoding).toString("utf-8");
  return {
    content,
    htmlUrl: data.html_url,
  };
}
