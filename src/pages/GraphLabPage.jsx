import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Link,
} from "react-router-dom";

import usePlayback from "../hooks/usePlayback";

import PlaybackControls from "../components/controls/PlaybackControls";

import {
  generateCustomBFSSteps,
} from "../algorithms/customBFS";

import {
  generateCustomDFSSteps,
} from "../algorithms/customDFS";

function GraphLabPage() {
  const [nodes, setNodes] =
    useState([]);

  const [edges, setEdges] =
    useState([]);

  const [fromNode, setFromNode] =
    useState("");

  const [toNode, setToNode] =
    useState("");

  const [
    startNode,
    setStartNode,
  ] = useState("");

  const [
    traversalStarted,
    setTraversalStarted,
  ] = useState(false);

  const [
    mode,
    setMode,
  ] = useState("bfs");

  useEffect(() => {
  const savedGraph =
    localStorage.getItem(
      "graph-builder"
    );

  if (!savedGraph) {
    return;
  }

  const graph =
    JSON.parse(savedGraph);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setNodes(graph.nodes || []);

  setEdges(graph.edges || []);
  }, []);
  
  useEffect(() => {
  localStorage.setItem(
    "graph-builder",
    JSON.stringify({
      nodes,
      edges,
    })
  );
}, [nodes, edges]);

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

  const moveNode = (
    nodeId,
    x,
    y
  ) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              x,
              y,
            }
          : node
      )
    );
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
  };

  const deleteNode = (nodeId) => {
  setNodes((prev) =>
    prev.filter(
      (node) => node.id !== nodeId
    )
  );

  setEdges((prev) =>
    prev.filter(
      (edge) =>
        edge.from !== nodeId &&
        edge.to !== nodeId
    )
  );

  if (startNode === nodeId) {
    setStartNode("");
  }
};

const deleteEdge = (index) => {
  setEdges((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );
};

// eslint-disable-next-line no-unused-vars
const clearGraph = () => {
  setNodes([]);
  setEdges([]);

  setFromNode("");
  setToNode("");

  setStartNode("");

  setTraversalStarted(
    false
  );

  playback.reset();
};
  
  const steps =
    useMemo(() => {
      if (!traversalStarted) {
        return [];
      }

      if (mode === "bfs") {
        return generateCustomBFSSteps(
          nodes,
          edges,
          startNode
        );
      }

      return generateCustomDFSSteps(
        nodes,
        edges,
        startNode
      );
    }, [
      traversalStarted,
      nodes,
      edges,
      startNode,
      mode,
    ]);

  const playback =
    usePlayback(
      steps.length || 1
    );

  const step =
    steps[
      playback.currentStep
    ] || {
      current: null,
      visited: [],
      traversal: [],
      queue: [],
      stack: [],
      description:
        "Build a graph and start traversal",
    };

  const runTraversal =
    () => {
      if (!startNode) {
        return;
      }

      setTraversalStarted(
        true
      );

      setTimeout(() => {
        playback.reset();
      }, 0);
    };

  return (
    <section className="container-page">

<div className="page-header">
  <Link
    to="/"
    className="back-btn"
  >
    ← Back to Home
  </Link>

  <h1 className="algorithm-title">
    Graph Builder
  </h1>
      </div>
      
      <div className="graph-builder-actions">
  <button
    className="generate-btn"
    onClick={addNode}
  >
    Add Node
  </button>

  <button
    className="generate-btn"
    onClick={() => {
      localStorage.setItem(
        "graph-builder",
        JSON.stringify({
          nodes,
          edges,
        })
      );
    }}
  >
    Save Graph
  </button>

  <button
    className="generate-btn"
    onClick={() => {
      const savedGraph =
        localStorage.getItem(
          "graph-builder"
        );

      if (!savedGraph) {
        return;
      }

      const graph =
        JSON.parse(savedGraph);

      setNodes(
        graph.nodes || []
      );

      setEdges(
        graph.edges || []
      );
    }}
  >
    Load Graph
  </button>

  <button
    className="generate-btn"
    onClick={() => {
      setNodes([]);

      setEdges([]);

      setTraversalStarted(
        false
      );

      localStorage.removeItem(
        "graph-builder"
      );
    }}
  >
    Clear Graph
  </button>
</div>

      {nodes.length >= 2 && (
        <>
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
                From
              </option>

              {nodes.map(
                (node) => (
                  <option
                    key={node.id}
                    value={node.id}
                  >
                    {node.id}
                  </option>
                )
              )}
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
                To
              </option>

              {nodes.map(
                (node) => (
                  <option
                    key={node.id}
                    value={node.id}
                  >
                    {node.id}
                  </option>
                )
              )}
            </select>

            <button
              className="generate-btn"
              onClick={addEdge}
            >
              Add Edge
            </button>
          </div>

          <div className="edge-controls">
            <select
              value={startNode}
              onChange={(e) =>
                setStartNode(
                  e.target.value
                )
              }
            >
              <option value="">
                Start Node
              </option>

              {nodes.map(
                (node) => (
                  <option
                    key={node.id}
                    value={node.id}
                  >
                    {node.id}
                  </option>
                )
              )}
            </select>

            <button
              className="generate-btn"
              onClick={() => {
                setMode("bfs");
                runTraversal();
              }}
            >
              Run BFS
            </button>

            <button
              className="generate-btn"
              onClick={() => {
                setMode("dfs");
                runTraversal();
              }}
            >
              Run DFS
            </button>
          </div>
        </>
      )}

      <div className="graph-builder-canvas">
        <svg
          className="graph-builder-svg"
          width="100%"
          height="100%"
        >
          {edges.map(
            (
              edge,
              index
            ) => {
              const from =
                nodes.find(
                  (n) =>
                    n.id ===
                    edge.from
                );

              const to =
                nodes.find(
                  (n) =>
                    n.id ===
                    edge.to
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

        {nodes.map((node) => {
          let className =
            "graph-builder-node";

          if (
            step.visited.includes(
              node.id
            )
          ) {
            className +=
              " graph-visited";
          }

          if (
            step.current ===
            node.id
          ) {
            className +=
              " graph-current";
          }

          return (
            <div
  key={node.id}
  className={className}
  draggable
  onDrag={(e) => {
    if (
      e.clientX === 0 ||
      e.clientY === 0
    ) {
      return;
    }

    const rect =
      e.currentTarget.parentElement.getBoundingClientRect();

    moveNode(
      node.id,
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  }}
  style={{
    left: node.x,
    top: node.y,
  }}
>
  {node.id}

  <button
    className="delete-node-btn"
    onClick={() =>
      deleteNode(node.id)
    }
  >
    ×
  </button>
</div>
          );
        })}
      </div>

      {edges.length > 0 && (
  <div className="edges-list">
    <h3>
      Existing Edges
    </h3>

    {edges.map(
      (
        edge,
        index
      ) => (
        <div
          key={index}
          className="edge-item"
        >
          <span>
            {edge.from}
            {" ↔ "}
            {edge.to}
          </span>

          <button
            onClick={() =>
              deleteEdge(index)
            }
          >
            Delete
          </button>
        </div>
      )
    )}
  </div>
      )}
      
      {steps.length > 0 && (
        <>
          <div className="queue-box">
            {mode === "bfs"
              ? `Queue: ${
                  step.queue?.length
                    ? step.queue.join(
                        " → "
                      )
                    : "Empty"
                }`
              : `Stack: ${
                  step.stack?.length
                    ? step.stack.join(
                        " → "
                      )
                    : "Empty"
                }`}
          </div>

          <div className="traversal-box">
            {mode.toUpperCase()}
            {" "}
            Traversal:
            {" "}
            {step.traversal.join(
              " → "
            )}
          </div>

          <PlaybackControls
            isPlaying={
              playback.isPlaying
            }
            onPlay={
              playback.play
            }
            onPause={
              playback.pause
            }
            onNext={
              playback.next
            }
            onPrev={
              playback.prev
            }
            onReset={
              playback.reset
            }
            speed={
              playback.speed
            }
            setSpeed={
              playback.setSpeed
            }
          />

          <div className="description-box">
            {step.description}
          </div>
        </>
      )}
    </section>
  );
}

export default GraphLabPage;