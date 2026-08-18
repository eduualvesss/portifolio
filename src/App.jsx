import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { getProfile, getRepos } from "./api.js";
import { profile as staticProfile } from "./content.js";

const OWN_README_REPO = staticProfile.githubUsername.toLowerCase();

export default function App() {
  const [liveStats, setLiveStats] = useState(null);
  const [repoStatus, setRepoStatus] = useState("loading");
  const [repos, setRepos] = useState([]);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    getProfile()
      .then(({ data }) => setLiveStats(data))
      .catch(() => {
        /* Hero still renders fine without live stats. */
      });

    getRepos()
      .then(({ data, isStale: stale }) => {
        const filtered = data.filter((repo) => repo.name.toLowerCase() !== OWN_README_REPO);
        setRepos(filtered);
        setIsStale(stale);
        setRepoStatus("loaded");
      })
      .catch(() => setRepoStatus("error"));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero liveStats={liveStats} />
        <ProjectsSection status={repoStatus} projects={repos} isStale={isStale} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
