import { motion } from "framer-motion";

function BarVisualizer({ values }) {
  const maxValue = Math.max(...values);

  return (
    <div className="bars-wrapper">
      {values.map((value, index) => (
        <div
          key={`${value}-${index}`}
          className="bar-container"
        >
          <motion.div
            layout
            transition={{
              duration: 0.4,
            }}
            className="bar"
            style={{
              height: `${
                (value / maxValue) * 260
              }px`,
            }}
          />

          <span>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BarVisualizer;