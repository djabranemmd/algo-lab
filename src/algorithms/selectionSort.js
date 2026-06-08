export function generateSelectionSortSteps(
  inputArray
) {
  const arr = [...inputArray];

  const steps = [];

  let comparisons = 0;

  let swaps = 0;

  steps.push({
    array: [...arr],
    comparing: [],
    minimum: null,
    sorted: [],
    description:
      "Initial array",
  });

  for (
    let i = 0;
    i < arr.length;
    i++
  ) {
    let minIndex = i;

    steps.push({
      array: [...arr],
      comparing: [],
      minimum:
        minIndex,
      sorted:
        Array.from(
          { length: i },
          (_, idx) => idx
        ),
      description: `Current minimum is ${arr[minIndex]}`,
    });

    for (
      let j = i + 1;
      j < arr.length;
      j++
    ) {
      comparisons++;

      steps.push({
        array: [...arr],
        comparing: [j],
        minimum:
          minIndex,
        sorted:
          Array.from(
            { length: i },
            (_, idx) => idx
          ),
        description: `Comparing ${arr[j]} with current minimum ${arr[minIndex]}`,
      });

      if (
        arr[j] <
        arr[minIndex]
      ) {
        minIndex = j;

        steps.push({
          array: [...arr],
          comparing: [],
          minimum:
            minIndex,
          sorted:
            Array.from(
              {
                length: i,
              },
              (_, idx) =>
                idx
            ),
          description: `New minimum found: ${arr[minIndex]}`,
        });
      }
    }

    if (
      minIndex !== i
    ) {
      swaps++;
    }

    [
      arr[i],
      arr[minIndex],
    ] = [
      arr[minIndex],
      arr[i],
    ];

    steps.push({
      array: [...arr],
      comparing: [],
      minimum: null,
      sorted:
        Array.from(
          {
            length: i + 1,
          },
          (_, idx) => idx
        ),
      description: `Placed ${arr[i]} in its final position`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    minimum: null,
    sorted: arr.map(
      (_, index) => index
    ),
    description:
      "Array sorted successfully",
  });

  return {
    steps,

    stats: {
      comparisons,
      swaps,
    },
  };
}