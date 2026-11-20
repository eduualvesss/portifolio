import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import TechTape from "./components/TechTape.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { getProfile, getRepos } from "./api.js";
import {
  profile as staticProfile,
  excludedRepos,
  privateProjects,
  projectOverrides,
  toolkitTape,
  signoffTape,
} from "./content.js";

const OWN_README_REPO = staticProfile.githubUsername.toLowerCase();
const HIDDEN_REPOS = new Set([OWN_README_REPO, ...excludedRepos.map((name) => name.toLowerCase())]);

function enrichRepo(repo) {
  const override = projectOverrides[repo.name.toLowerCase()];
  if (!override) return repo;

  return {
    ...repo,
    description: repo.description || override.description || null,
    topics: repo.topics && repo.topics.length > 0 ? repo.topics : override.topics ?? [],
  };
}

export default function App() {
  const [liveStats, setLiveStats] = useState(null);
  const [repoStatus, setRepoStatus] = useState("loading");
  const [repos, setRepos] = useState(privateProjects);
  const [isStale, setIsStale] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  const handleRetryRepos = useCallback(() => {
    setRepoStatus("loading");
    setRetryToken((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getProfile({ signal: controller.signal })
      .then(({ data }) => setLiveStats(data))
      .catch(() => {
        /* Hero still renders fine without live stats. */
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getRepos({ signal: controller.signal })
      .then(({ data, isStale: stale }) => {
        const enriched = data
          .filter((repo) => !HIDDEN_REPOS.has(repo.name.toLowerCase()))
          .map(enrichRepo);
        setRepos([...privateProjects, ...enriched]);
        setIsStale(stale);
        setRepoStatus("loaded");
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        setRepos(privateProjects);
        setRepoStatus("error");
      });

    return () => controller.abort();
  }, [retryToken]);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero liveStats={liveStats} />
        <TechTape items={toolkitTape} />
        <ProjectsSection
          status={repoStatus}
          projects={repos}
          isStale={isStale}
          onRetry={handleRetryRepos}
        />
        <About />
        <Contact />
        <TechTape items={signoffTape} reverse />
      </main>
      <Footer />
    </>
  );
}
