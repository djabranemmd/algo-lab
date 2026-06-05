export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];

  const steps = [];

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: [],
    description: "Initial array",
  });

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: [],
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [
          arr[j + 1],
          arr[j],
        ];

        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: [],
          description: `Swapped ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }

    const sortedIndexes = [];

    for (
      let k = arr.length - 1;
      k >= arr.length - i - 1;
      k--
    ) {
      sortedIndexes.push(k);
    }

    steps.push({
      array: [...arr],
      comparing: [],
      sorted: sortedIndexes,
      description: "Element placed in final position",
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    sorted: arr.map((_, index) => index),
    description: "Array sorted successfully",
  });

  return steps;
}