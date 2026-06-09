import { useState } from "react";

function GraphLabPage() {
  const [nodes, setNodes] = useState([]);

  const addNode = () => {
    const nextLetter = String.fromCharCode(
      65 + nodes.length
    );

    setNodes((prev) => [
      ...prev,
      {
        id: nextLetter,
        x: 120 + (prev.length % 4) * 150,
        y: 120 + Math.floor(prev.length / 4) * 150,
      },
    ]);
  };

  return (
    <section className="container-page">
      <h1 className="algorithm-title">
        Graph Builder
      </h1>

      <p className="hero-subtitle">
        Create your own graph and later run
        BFS and DFS visually.
      </p>

      <div className="graph-builder-actions">
        <button
          className="generate-btn"
          onClick={addNode}
        >
          Add Node
        </button>
      </div>

      <div className="graph-builder-canvas">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="graph-builder-node"
            style={{
              left: node.x,
              top: node.y,
            }}
          >
            {node.id}
          </div>
        ))}
      </div>
    </section>
  );
}

export default GraphLabPage;