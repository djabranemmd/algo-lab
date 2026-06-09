import { Link } from "react-router-dom";

import { algorithms } from "../data/algorithms";

function DashboardPage() {
  const totalAlgorithms =
    algorithms.filter(
      (algo) => algo.available
    ).length;

  const categories =
    new Set(
      algorithms.map(
        (algo) => algo.category
      )
    ).size;

  return (
    <section className="container-page">
      <Link
        to="/"
        className="back-button"
      >
        ← Back to Home
      </Link>

      <h1 className="algorithm-title">
        Dashboard
      </h1>

      <div className="dashboard-grid">
        <div className="glass-card">
          <h3>
            Algorithms
          </h3>

          <p>
            {totalAlgorithms}
          </p>
        </div>

        <div className="glass-card">
          <h3>
            Categories
          </h3>

          <p>
            {categories}
          </p>
        </div>

        <div className="glass-card">
          <h3>
            Themes
          </h3>

          <p>2</p>
        </div>

        <div className="glass-card">
          <h3>
            Comparison Tool
          </h3>

          <p>1</p>
        </div>
      </div>

      <div className="glass-card dashboard-section">
        <h2>
          Algorithm Complexity
        </h2>

        <div className="complexity-list">
          <div>
            Bubble Sort
            <span>
              O(n²)
            </span>
          </div>

          <div>
            Selection Sort
            <span>
              O(n²)
            </span>
          </div>

          <div>
            Binary Search
            <span>
              O(log n)
            </span>
          </div>

          <div>
            BFS
            <span>
              O(V + E)
            </span>
          </div>

          <div>
            DFS
            <span>
              O(V + E)
            </span>
          </div>
        </div>
      </div>

      <div className="glass-card dashboard-section">
        <h2>
          Quick Access
        </h2>

        <div className="quick-links">
          <Link
            to="/algorithm/bubble-sort"
            className="dashboard-link"
          >
            Bubble Sort
          </Link>

          <Link
            to="/algorithm/binary-search"
            className="dashboard-link"
          >
            Binary Search
          </Link>

          <Link
            to="/comparison"
            className="dashboard-link"
          >
            Comparison Tool
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;