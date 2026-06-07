export const algorithmDetails = {
  "bubble-sort": {
    title: "Bubble Sort",

    overview:
      "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },

    spaceComplexity: "O(1)",

    useCases: [
      "Educational purposes",
      "Very small datasets",
      "Learning sorting fundamentals",
    ],
  },

  "selection-sort": {
    title: "Selection Sort",

    overview:
      "Selection Sort repeatedly selects the minimum element and places it in its correct position.",

    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },

    spaceComplexity: "O(1)",

    useCases: [
      "Educational purposes",
      "Memory constrained systems",
    ],
  },

  "binary-search": {
    title: "Binary Search",

    overview:
      "Binary Search repeatedly divides a sorted array into halves to locate a target efficiently.",

    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },

    spaceComplexity: "O(1)",

    useCases: [
      "Searching sorted arrays",
      "Databases",
      "Search engines",
    ],
  },
};