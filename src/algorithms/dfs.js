export function generateDFSSteps() {
  const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: [],
    F: [],
  };

  const visited =
    new Set();

  const traversal = [];

  const steps = [];

  function dfs(node) {
    visited.add(node);

    traversal.push(node);

    steps.push({
      current: node,

      visited: [
        ...visited,
      ],

      traversal: [
        ...traversal,
      ],

      description:
        `Visit ${node}`,
    });

    for (const neighbor of graph[
      node
    ]) {
      if (
        !visited.has(
          neighbor
        )
      ) {
        dfs(neighbor);
      }
    }
  }

  dfs("A");

  return steps;
}