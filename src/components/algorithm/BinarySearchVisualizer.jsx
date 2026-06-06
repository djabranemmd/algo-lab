import { useMemo, useState } from "react";

import usePlayback from "../../hooks/usePlayback";

import PlaybackControls from "../controls/PlaybackControls";

import {
  generateBinarySearchSteps,
} from "../../algorithms/binarySearch";

function BinarySearchVisualizer() {
  const [
    arrayInput,
    setArrayInput,
  ] = useState(
    "1 3 5 7 9 11 13"
  );

  const [
    targetInput,
    setTargetInput,
  ] = useState("9");

  const [
    numbers,
    setNumbers,
  ] = useState([
    1,
    3,
    5,
    7,
    9,
    11,
    13,
  ]);

  const [
    target,
    setTarget,
  ] = useState(9);

  const steps = useMemo(() => {
    return generateBinarySearchSteps(
      numbers,
      target
    );
  }, [numbers, target]);

  const playback =
    usePlayback(
      steps.length
    );

  const generateSearch =
    () => {
      const parsedArray =
        arrayInput
          .trim()
          .split(/\s+/)
          .map(Number);

      const parsedTarget =
        Number(targetInput);

      if (
        parsedArray.some(
          Number.isNaN
        )
      ) {
        return;
      }

      if (
        Number.isNaN(
          parsedTarget
        )
      ) {
        return;
      }

      setNumbers(
        parsedArray
      );

      setTarget(
        parsedTarget
      );

      playback.reset();
    };

  const step =
    steps[
      playback.currentStep
    ];

  return (
    <>
      <div className="binary-inputs">
        <input
          value={arrayInput}
          onChange={(e) =>
            setArrayInput(
              e.target.value
            )
          }
          placeholder="1 3 5 7 9"
          className="array-input"
        />

        <input
          value={targetInput}
          onChange={(e) =>
            setTargetInput(
              e.target.value
            )
          }
          placeholder="Target"
          className="array-input"
        />

        <button
          className="generate-btn"
          onClick={
            generateSearch
          }
        >
          Generate Search
        </button>
      </div>

      <div className="binary-array">
        {step.array.map(
          (
            value,
            index
          ) => {
            let className =
              "binary-item";

            if (
              step.found &&
              index ===
                step.middle
            ) {
              className +=
                " binary-found";
            } else if (
              index ===
              step.middle
            ) {
              className +=
                " binary-middle";
            }

            return (
              <div
                key={index}
                className={
                  className
                }
              >
                {value}
              </div>
            );
          }
        )}
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

      <div className="description-box">
        {step.description}
      </div>

      <div className="complexity-panel">
        <h3>
          Complexity
        </h3>

        <p>
          Best Case:
          O(1)
        </p>

        <p>
          Average:
          O(log n)
        </p>

        <p>
          Worst:
          O(log n)
        </p>

        <p>
          Space:
          O(1)
        </p>
      </div>
    </>
  );
}

export default BinarySearchVisualizer;