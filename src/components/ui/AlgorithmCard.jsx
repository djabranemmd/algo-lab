import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AlgorithmCard({
  title,
  description,
  slug,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass-card"
    >
      <h3>{title}</h3>

      <p>{description}</p>

      <Link
        to={`/algorithm/${slug}`}
        className="card-link"
      >
        Open Visualizer →
      </Link>
    </motion.div>
  );
}

export default AlgorithmCard;