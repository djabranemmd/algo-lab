import { useState } from "react";

function GraphLabPage() {
  const [nodes, setNodes] = useState([]);

  const [edges, setEdges] = useState([]);

  const [fromNode, setFromNode] =
    useState("");

  const [toNode, setToNode] =
    useState("");

  const addNode = () => {
    const nextLetter =
      String.fromCharCode(
        65 + nodes.length
      );

    setNodes((prev) => [
      ...prev,
      {
        id: nextLetter,
        x:
          120 +
          (prev.length % 4) *
            150,

        y:
          120 +
          Math.floor(
            prev.length / 4
          ) *
            150,
      },
    ]);
  };

  const addEdge = () => {
    if (
      !fromNode ||
      !toNode ||
      fromNode === toNode
    ) {
      return;
    }

    const exists =
      edges.some(
        (edge) =>
          (edge.from ===
            fromNode &&
            edge.to ===
              toNode) ||
          (edge.from ===
            toNode &&
            edge.to ===
              fromNode)
      );

    if (exists) {
      return;
    }

    setEdges((prev) => [
      ...prev,
      {
        from: fromNode,
        to: toNode,
      },
    ]);

    setToNode("");
  };

  return (
    <section className="container-page">
      <h1 className="algorithm-title">
        Graph Builder
      </h1>

      <p className="hero-subtitle">
        Create your own graph and
        later run BFS and DFS
        visually.
      </p>

      <div className="graph-builder-actions">
        <button
          className="generate-btn"
          onClick={addNode}
        >
          Add Node
        </button>
      </div>

      {nodes.length >= 2 && (
        <div className="edge-controls">
          <select
            value={fromNode}
            onChange={(e) =>
              setFromNode(
                e.target.value
              )
            }
          >
            <option value="">
              From Node
            </option>

            {nodes.map((node) => (
              <option
                key={node.id}
                value={node.id}
              >
                {node.id}
              </option>
            ))}
          </select>

          <select
            value={toNode}
            onChange={(e) =>
              setToNode(
                e.target.value
              )
            }
          >
            <option value="">
              To Node
            </option>

            {nodes.map((node) => (
              <option
                key={node.id}
                value={node.id}
              >
                {node.id}
              </option>
            ))}
          </select>

          <button
            className="generate-btn"
            onClick={addEdge}
          >
            Add Edge
          </button>
        </div>
      )}

      <div className="graph-builder-canvas">
        <svg
          className="graph-builder-svg"
          width="100%"
          height="100%"
        >
          {edges.map(
            (edge, index) => {
              const from =
                nodes.find(
                  (n) =>
                    n.id ===
                    edge.from
                );

              const to =
                nodes.find(
                  (n) =>
                    n.id === edge.to
                );

              if (
                !from ||
                !to
              ) {
                return null;
              }

              return (
                <line
                  key={index}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                />
              );
            }
          )}
        </svg>

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