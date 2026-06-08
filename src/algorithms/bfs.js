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

    steps.push({
      current,
      queue: [...queue],
      visited: [
        ...visited,
      ],
      description: `Visiting ${current}`,
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
      description: `Added neighbors of ${current} to queue`,
    });
  }

  return steps;
}