export function generateBinarySearchSteps(inputArray, target) {
  const arr = [...inputArray].sort((a, b) => a - b);

  const steps = [];

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      left,
      right,
      middle,
      found: false,
      target,
      description: `Checking middle value ${arr[middle]}`,
    });

    if (arr[middle] === target) {
      steps.push({
        array: [...arr],
        left,
        right,
        middle,
        found: true,
        target,
        description: `Target ${target} found`,
      });

      return steps;
    }

    if (target > arr[middle]) {
      steps.push({
        array: [...arr],
        left,
        right,
        middle,
        found: false,
        target,
        description: `${target} > ${arr[middle]} → Search right half`,
      });

      left = middle + 1;
    } else {
      steps.push({
        array: [...arr],
        left,
        right,
        middle,
        found: false,
        target,
        description: `${target} < ${arr[middle]} → Search left half`,
      });

      right = middle - 1;
    }
  }

  steps.push({
    array: [...arr],
    left: -1,
    right: -1,
    middle: -1,
    found: false,
    target,
    description: `Target ${target} not found`,
  });

  return steps;
}
