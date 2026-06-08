import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AlgorithmCard({
  title,
  description,
  slug,
  available = true,
  externalPath,
}) {
  const destination =
    externalPath ||
    `/algorithm/${slug}`;

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="glass-card"
    >
      <h3>{title}</h3>

      <p>{description}</p>

      {available ? (
        <Link
          to={destination}
          className="card-link"
        >
          Open →
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