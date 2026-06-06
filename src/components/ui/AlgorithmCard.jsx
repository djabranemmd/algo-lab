import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AlgorithmCard({
  title,
  description,
  slug,
  category,
  available,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass-card algorithm-card"
    >
      <div className="card-top">
        <span className="category-badge">
          {category}
        </span>

        {!available && (
          <span className="soon-badge">
            Soon
          </span>
        )}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {available ? (
        <Link
          to={`/algorithm/${slug}`}
          className="card-link"
        >
          Open Visualizer →
        </Link>
      ) : (
        <span className="disabled-link">
          Coming Soon
        </span>
      )}
    </motion.div>
  );
}

export default AlgorithmCard;