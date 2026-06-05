import { motion } from "framer-motion";

const algorithms = [
  {
    title: "Bubble Sort",
    description: "Visualize adjacent comparisons and swaps.",
  },
  {
    title: "Selection Sort",
    description: "Discover how minimum elements are selected.",
  },
  {
    title: "Binary Search",
    description: "Learn logarithmic search visually.",
  },
  {
    title: "BFS",
    description: "Breadth First Search traversal.",
  },
  {
    title: "DFS",
    description: "Depth First Search traversal.",
  },
];

function HomePage() {
  return (
    <section className="container-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="hero-title">
          AlgoLab
        </h1>

        <p className="hero-subtitle">
          Interactive algorithm visualizations designed
          to help you understand how algorithms think.
        </p>
      </motion.div>

      <div className="cards-grid">
        {algorithms.map((algorithm) => (
          <motion.div
            whileHover={{
              y: -8,
            }}
            key={algorithm.title}
            className="glass-card"
          >
            <h3>{algorithm.title}</h3>

            <p>
              {algorithm.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;