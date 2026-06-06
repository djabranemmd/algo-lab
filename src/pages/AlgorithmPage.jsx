import { Link, useParams } from "react-router-dom";

import BubbleSortVisualizer from "../components/algorithm/BubbleSortVisualizer";

function AlgorithmPage() {
  const { slug } = useParams();

  return (
    <section className="container-page">
      <Link
        to="/"
        className="back-button"
      >
        ← Back to Home
      </Link>

      {slug ===
      "bubble-sort" ? (
        <>
          <h1 className="algorithm-title">
            Bubble Sort
          </h1>

          <BubbleSortVisualizer />
        </>
      ) : (
        <div className="glass-card">
          <h2>
            Coming Soon
          </h2>
        </div>
      )}
    </section>
  );
}

export default AlgorithmPage;