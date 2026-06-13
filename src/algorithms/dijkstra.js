export function generateDijkstraSteps(
  nodes,
  edges,
  startNode,
  endNode
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

  const previous = {};

  const visited = new Set();


  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  });


  distances[startNode] = 0;


  const steps = [];


  steps.push({
    current: null,
    visited: [],
    distances: {
      ...distances,
    },
    path: [],
    description:
      "Starting Dijkstra algorithm",
  });


  while (visited.size < nodes.length) {

    let current = null;


    let smallestDistance =
      Infinity;


    nodes.forEach((node) => {

      if (
        !visited.has(node.id) &&
        distances[node.id] <
          smallestDistance
      ) {
        smallestDistance =
          distances[node.id];

        current =
          node.id;
      }

    });


    if (current === null) {
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
      path: [],
      description:
        `Visiting node ${current}`,
    });


    graph[current].forEach(
      (neighbor) => {

        if (
          visited.has(
            neighbor.node
          )
        ) {
          return;
        }


        const newDistance =
          distances[current] +
          neighbor.weight;


        if (
          newDistance <
          distances[neighbor.node]
        ) {

          distances[neighbor.node] =
            newDistance;


          previous[neighbor.node] =
            current;


          steps.push({
            current,
            visited: [
              ...visited,
            ],
            distances: {
              ...distances,
            },
            path: [],
            description:
              `Updated distance of ${neighbor.node} to ${newDistance}`,
          });

        }

      }
    );


    if (
      current === endNode
    ) {
      break;
    }

  }


  const shortestPath = [];


  let current =
    endNode;


  while (
    current
  ) {

    shortestPath.unshift(
      current
    );

    current =
      previous[current];

  }


  steps.push({
    current: null,
    visited: [
      ...visited,
    ],
    distances: {
      ...distances,
    },
    path:
      shortestPath,
    description:
      `Shortest path found: ${shortestPath.join(
        " → "
      )}`,
  });


  return steps;
}