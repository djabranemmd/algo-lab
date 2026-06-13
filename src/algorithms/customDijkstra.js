export function generateCustomDijkstraSteps(
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


  while (
    visited.size <
    nodes.length
  ) {

    let current = null;
    let smallest =
      Infinity;


    Object.keys(distances)
      .forEach((node) => {

        if (
          !visited.has(node) &&
          distances[node] <
            smallest
        ) {
          smallest =
            distances[node];

          current =
            node;
        }

      });


    if (current === null)
      break;


    visited.add(current);


    steps.push({
      current,
      visited: [
        ...visited,
      ],
      distances:{
        ...distances,
      },
      path:[],
      description:
        `Selected node ${current} with smallest distance`,
    });


    graph[current].forEach(
      (neighbor) => {

        if (
          visited.has(
            neighbor.node
          )
        )
          return;


        const newDistance =
          distances[current] +
          neighbor.weight;


        if (
          newDistance <
          distances[neighbor.node]
        ) {

          distances[
            neighbor.node
          ] =
            newDistance;


          previous[
            neighbor.node
          ] =
            current;


          steps.push({
            current,
            visited:[
              ...visited,
            ],
            distances:{
              ...distances,
            },
            path:[],
            description:
              `Updated distance of ${neighbor.node}`,
          });

        }

      }
    );
  }


  let path = [];

  if (endNode) {

    let current =
      endNode;


    while(current){

      path.unshift(
        current
      );

      current =
        previous[current];
    }

  }


  steps.push({
    current:null,
    visited:[
      ...visited,
    ],
    distances:{
      ...distances,
    },
    path,
    description:
      endNode
        ? `Shortest path found: ${path.join(
            " → "
          )}`
        : "Dijkstra completed",
  });


  return steps;
}