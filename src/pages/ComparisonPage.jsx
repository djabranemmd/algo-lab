import { useMemo, useState } from "react";

import {
  generateBubbleSortSteps,
} from "../algorithms/bubbleSort";

import {
  generateSelectionSortSteps,
} from "../algorithms/selectionSort";

import BarVisualizer from "../components/visualizers/BarVisualizer";

function ComparisonPage() {
  const [
    inputValue,
    setInputValue,
  ] = useState(
    "5 3 8 1 4"
  );

  const [
    numbers,
    setNumbers,
  ] = useState([
    5,
    3,
    8,
    1,
    4,
  ]);

  const bubble =
    useMemo(() => {
      return generateBubbleSortSteps(
        numbers
      );
    }, [numbers]);

  const selection =
    useMemo(() => {
      return generateSelectionSortSteps(
        numbers
      );
    }, [numbers]);

  const generateArray =
    () => {
      const parsed =
        inputValue
          .trim()
          .split(/\s+/)
          .map(Number);

      if (
        parsed.some(
          Number.isNaN
        )
      ) {
        return;
      }

      setNumbers(parsed);
    };

  return (
    <section className="container-page">
      <h1 className="algorithm-title">
        Algorithm Comparison
      </h1>

      <div className="comparison-input">
        <input
          className="array-input"
          value={inputValue}
          onChange={(e) =>
            setInputValue(
              e.target.value
            )
          }
        />

        <button
          className="generate-btn"
          onClick={
            generateArray
          }
        >
          Compare
        </button>
      </div>

      <div className="comparison-grid">
        <div className="glass-card">
          <h2>
            Bubble Sort
          </h2>

          <BarVisualizer
            values={
              bubble.steps[
                bubble.steps
                  .length - 1
              ].array
            }
            comparing={[]}
            sorted={
              bubble.steps[
                bubble.steps
                  .length - 1
              ].array.map(
                (_, index) =>
                  index
              )
            }
          />

          <div className="stats-panel">
            <div>
              Comparisons:
              {" "}
              {
                bubble.stats
                  .comparisons
              }
            </div>

            <div>
              Swaps:
              {" "}
              {
                bubble.stats
                  .swaps
              }
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h2>
            Selection Sort
          </h2>

          <BarVisualizer
            values={
              selection.steps[
                selection.steps
                  .length - 1
              ].array
            }
            comparing={[]}
            sorted={
              selection.steps[
                selection.steps
                  .length - 1
              ].array.map(
                (_, index) =>
                  index
              )
            }
          />

          <div className="stats-panel">
            <div>
              Comparisons:
              {" "}
              {
                selection.stats
                  .comparisons
              }
            </div>

            <div>
              Swaps:
              {" "}
              {
                selection.stats
                  .swaps
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComparisonPage;