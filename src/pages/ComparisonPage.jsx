import {
  useMemo,
  useState,
} from "react";

import usePlayback from "../hooks/usePlayback";

import {
  generateBubbleSortSteps,
} from "../algorithms/bubbleSort";

import {
  generateSelectionSortSteps,
} from "../algorithms/selectionSort";

import BarVisualizer from "../components/visualizers/BarVisualizer";
import PlaybackControls from "../components/controls/PlaybackControls";

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

  const maxSteps =
    Math.max(
      bubble.steps.length,
      selection.steps.length
    );

  const playback =
    usePlayback(
      maxSteps
    );

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

      playback.reset();
    };

  const bubbleStep =
    bubble.steps[
      Math.min(
        playback.currentStep,
        bubble.steps.length -
          1
      )
    ];

  const selectionStep =
    selection.steps[
      Math.min(
        playback.currentStep,
        selection.steps.length -
          1
      )
    ];

  return (
    <section className="container-page">
      <h1 className="algorithm-title">
        Live Algorithm Comparison
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
          Generate
        </button>
      </div>

      <PlaybackControls
        isPlaying={
          playback.isPlaying
        }
        onPlay={
          playback.play
        }
        onPause={
          playback.pause
        }
        onNext={
          playback.next
        }
        onPrev={
          playback.prev
        }
        onReset={
          playback.reset
        }
        speed={
          playback.speed
        }
        setSpeed={
          playback.setSpeed
        }
      />

      <div className="comparison-grid">
        <div className="glass-card">
          <h2>
            Bubble Sort
          </h2>

          <BarVisualizer
            values={
              bubbleStep.array
            }
            comparing={
              bubbleStep.comparing
            }
            sorted={
              bubbleStep.sorted
            }
          />

          <div className="description-box">
            {
              bubbleStep.description
            }
          </div>

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
              selectionStep.array
            }
            comparing={
              selectionStep.comparing
            }
            minimum={
              selectionStep.minimum
            }
            sorted={
              selectionStep.sorted
            }
          />

          <div className="description-box">
            {
              selectionStep.description
            }
          </div>

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

      <div className="step-indicator">
        Global Step{" "}
        {playback.currentStep + 1}
        {" / "}
        {maxSteps}
      </div>
    </section>
  );
}

export default ComparisonPage;