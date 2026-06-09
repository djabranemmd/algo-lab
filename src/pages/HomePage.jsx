import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import AlgorithmCard from "../components/ui/AlgorithmCard";

import { algorithms } from "../data/algorithms";

import { Link } from "react-router-dom";

function HomePage() {
  const [search, setSearch] =
    useState("");

  const filteredAlgorithms =
    useMemo(() => {
      return algorithms.filter(
        (algorithm) =>
          algorithm.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          algorithm.category
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search]);

  return (
    <section className="container-page">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1 className="hero-title">
          AlgoLab
        </h1>

        <div className="home-actions">
  <Link
    to="/dashboard"
    className="dashboard-button"
  >
    Open Dashboard
  </Link>
        </div>

        <p className="hero-subtitle">
          Interactive algorithm visualizations
          designed to help you understand how
          algorithms think.
        </p>
        
        <div className="stats-box">
          <span>
            Algorithms:{" "}
            {algorithms.length}
          </span>

          <span>
            Available:{" "}
            {
              algorithms.filter(
                (a) =>
                  a.available
              ).length
            }
          </span>
        </div>

        <input
          className="search-input"
          placeholder="Search algorithms..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </motion.div>

      <div className="cards-grid">
        {filteredAlgorithms.map(
          (algorithm) => (
            <AlgorithmCard
              key={
                algorithm.slug
              }
              {...algorithm}
            />
          )
        )}
      </div>
    </section>
  );
}

export default HomePage;