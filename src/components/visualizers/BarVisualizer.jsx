import { motion } from "framer-motion";

function BarVisualizer({
  values,
  comparing,
  sorted,
}) {
  const maxValue = Math.max(...values);

  return (
    <div className="bars-wrapper">
      {values.map((value, index) => {
        let className = "bar";

        if (sorted.includes(index)) {
          className += " bar-sorted";
        } else if (
          comparing.includes(index)
        ) {
          className += " bar-comparing";
        }

        return (
          <div
            key={`${index}-${value}`}
            className="bar-container"
          >
            <motion.div
              layout
              transition={{
                duration: 0.35,
              }}
              className={className}
              style={{
                height: `${
                  (value / maxValue) * 260
                }px`,
              }}
            />

            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default BarVisualizer;