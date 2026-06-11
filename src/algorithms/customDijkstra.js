export function generateCustomDijkstraSteps(
  nodes,
  edges,
  startNode
) {
  if (
    !startNode ||
    nodes.length === 0
  ) {
    return [];
  }

  const graph = {};

  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  edges.forEach((edge) => {
    graph[edge.from].push({
      node: edge.to,
      weight: edge.weight,
    });

    graph[edge.to].push({
      node: edge.from,
      weight: edge.weight,
    });
  });

  const distances = {};
  const visited = new Set();

  nodes.forEach((node) => {
    distances[node.id] =
      Infinity;
  });

  distances[startNode] = 0;

  const steps = [];

  steps.push({
    current: null,
    visited: [],
    distances: {
      ...distances,
    },
    description:
      "Initialize distances",
  });

  while (
    visited.size <
    nodes.length
  ) {
    let current = null;
    let minDistance =
      Infinity;

    Object.keys(
      distances
    ).forEach((nodeId) => {
      if (
        !visited.has(
          nodeId
        ) &&
        distances[nodeId] <
          minDistance
      ) {
        minDistance =
          distances[nodeId];

        current = nodeId;
      }
    });

    if (
      current === null
    ) {
      break;
    }

    visited.add(current);

    steps.push({
      current,
      visited: [
        ...visited,
      ],
      distances: {
        ...distances,
      },
      description: `Visiting ${current}`,
    });

    graph[current].forEach(
      (
        neighbor
      ) => {
        const newDistance =
          distances[
            current
          ] +
          neighbor.weight;

        if (
          newDistance <
          distances[
            neighbor.node
          ]
        ) {
          distances[
            neighbor.node
          ] = newDistance;

          steps.push({
            current,
            visited: [
              ...visited,
            ],
            distances:
              {
                ...distances,
              },
            description:
              `Updated distance of ${neighbor.node} to ${newDistance}`,
          });
        }
      }
    );
  }

  steps.push({
    current: null,
    visited: [...visited],
    distances: {
      ...distances,
    },
    description:
      "Dijkstra completed",
  });

  return steps;
}