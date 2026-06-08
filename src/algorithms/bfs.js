export function generateBFSSteps() {
  const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: [],
    F: [],
  };

  const queue = ["A"];

  const visited =
    new Set();

  const traversal = [];

  const steps = [];

  while (queue.length) {
    const current =
      queue.shift();

    if (
      visited.has(current)
    ) {
      continue;
    }

    visited.add(current);

    traversal.push(current);

    steps.push({
      current,

      queue: [...queue],

      visited: [
        ...visited,
      ],

      traversal: [
        ...traversal,
      ],

      description:
        `Visiting ${current}`,
    });

    graph[current].forEach(
      (neighbor) => {
        if (
          !visited.has(
            neighbor
          )
        ) {
          queue.push(
            neighbor
          );
        }
      }
    );

    steps.push({
      current,

      queue: [...queue],

      visited: [
        ...visited,
      ],

      traversal: [
        ...traversal,
      ],

      description:
        `Added neighbors of ${current} to queue`,
    });
  }

  return steps;
}