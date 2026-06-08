import { Link, useParams } from "react-router-dom";

import BubbleSortVisualizer from "../components/algorithm/BubbleSortVisualizer";
import SelectionSortVisualizer from "../components/algorithm/SelectionSortVisualizer";
import BinarySearchVisualizer from "../components/algorithm/BinarySearchVisualizer";
import BFSVisualizer from "../components/algorithm/BFSVisualizer";

import AlgorithmInfo from "../components/algorithm/AlgorithmInfo";

import { algorithmDetails } from "../data/algorithmDetails";

function AlgorithmPage() {
  const { slug } = useParams();

  const algorithm =
    algorithmDetails[slug];

  return (
    <section className="container-page">
      <Link
        to="/"
        className="back-button"
      >
        ← Back to Home
      </Link>

      {algorithm && (
        <>
          <h1 className="algorithm-title">
            {algorithm.title}
          </h1>

          <AlgorithmInfo
            data={algorithm}
          />
        </>
      )}

      {slug === "bubble-sort" && (
        <BubbleSortVisualizer />
      )}

      {slug ===
        "selection-sort" && (
        <SelectionSortVisualizer />
      )}

      {slug ===
        "binary-search" && (
        <BinarySearchVisualizer />
      )}

      {slug === "bfs" && (
        <BFSVisualizer />
      )}

      {![
        "bubble-sort",
        "selection-sort",
        "binary-search",
        "bfs",
      ].includes(slug) && (
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