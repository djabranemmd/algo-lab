export function generateCustomBFSSteps(
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
    graph[edge.from].push(
      edge.to
    );

    graph[edge.to].push(
      edge.from
    );
  });

  const visited =
    new Set();

  const queue = [startNode];

  const traversal = [];

  const steps = [];

  visited.add(startNode);

  steps.push({
    current: null,
    visited: [],
    queue: [...queue],
    traversal: [],
    description:
      "Starting BFS traversal",
  });

  while (queue.length) {
    const current =
      queue.shift();

    traversal.push(current);

    steps.push({
      current,
      visited: [
        ...visited,
      ],
      queue: [...queue],
      traversal: [
        ...traversal,
      ],
      description: `Visiting node ${current}`,
    });

    for (const neighbor of graph[
      current
    ]) {
      if (
        !visited.has(
          neighbor
        )
      ) {
        visited.add(
          neighbor
        );

        queue.push(
          neighbor
        );

        steps.push({
          current,
          visited: [
            ...visited,
          ],
          queue: [
            ...queue,
          ],
          traversal:
            [
              ...traversal,
            ],
          description: `Added ${neighbor} to queue`,
        });
      }
    }
  }

  steps.push({
    current: null,
    visited: [...visited],
    queue: [],
    traversal: [
      ...traversal,
    ],
    description:
      "BFS completed",
  });

  return steps;
}