import { motion } from "framer-motion";

import AlgorithmCard from "../components/ui/AlgorithmCard";

import { algorithms } from "../data/algorithms";

function HomePage() {
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

        <p className="hero-subtitle">
          Interactive algorithm visualizations
          designed to help you understand how
          algorithms think.
        </p>
      </motion.div>

      <div className="cards-grid">
        {algorithms.map((algorithm) => (
          <AlgorithmCard
            key={algorithm.slug}
            {...algorithm}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage;