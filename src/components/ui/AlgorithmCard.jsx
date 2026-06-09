import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AlgorithmCard({
  title,
  description,
  slug,
}) {
  const target =
    slug === "graph-lab"
      ? "/graph-lab"
      : `/algorithm/${slug}`;

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
        to={target}
        className="card-link"
      >
        Open →
      </Link>
    </motion.div>
  );
}

export default AlgorithmCard;