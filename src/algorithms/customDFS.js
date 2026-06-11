export function generateCustomDFSSteps(
  nodes,
  edges,
  startNode
) {
  const adjacency = {};

  nodes.forEach((node) => {
    adjacency[node.id] = [];
  });

  edges.forEach((edge) => {
    adjacency[edge.from].push(
      edge.to
    );

    adjacency[edge.to].push(
      edge.from
    );
  });

  const visited = [];
  const traversal = [];
  const steps = [];

  function dfs(node) {
    visited.push(node);

    traversal.push(node);

    steps.push({
      current: node,
      visited: [...visited],
      traversal: [...traversal],
      stack: [...visited],
      description: `Visiting ${node}`,
    });

    adjacency[node].forEach(
      (neighbor) => {
        if (
          !visited.includes(
            neighbor
          )
        ) {
          dfs(neighbor);
        }
      }
    );
  }

  dfs(startNode);

  return steps;
}