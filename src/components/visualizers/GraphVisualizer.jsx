import {
  graphNodes,
  graphEdges,
} from "../../data/graphData";

function GraphVisualizer({
  current,
  visited,
}) {
  return (
    <div className="graph-wrapper">
      <svg
        className="graph-lines"
        width="600"
        height="350"
      >
        {graphEdges.map(
          (
            [from, to],
            index
          ) => {
            const start =
              graphNodes.find(
                (node) =>
                  node.id ===
                  from
              );

            const end =
              graphNodes.find(
                (node) =>
                  node.id ===
                  to
              );

            return (
              <line
                key={index}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
              />
            );
          }
        )}
      </svg>

      {graphNodes.map(
        (node) => {
          let className =
            "graph-node";

          if (
            visited.includes(
              node.id
            )
          ) {
            className +=
              " graph-visited";
          }

          if (
            current ===
            node.id
          ) {
            className +=
              " graph-current";
          }

          return (
            <div
              key={node.id}
              className={
                className
              }
              style={{
                left:
                  node.x,
                top:
                  node.y,
              }}
            >
              {node.id}
            </div>
          );
        }
      )}
    </div>
  );
}

export default GraphVisualizer;