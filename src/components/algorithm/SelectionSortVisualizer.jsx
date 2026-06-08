import { useMemo, useState } from "react";

import usePlayback from "../../hooks/usePlayback";

import ArrayInput from "./ArrayInput";
import ExampleArrays from "./ExampleArrays";

import BarVisualizer from "../visualizers/BarVisualizer";
import PlaybackControls from "../controls/PlaybackControls";

import {
  generateSelectionSortSteps,
} from "../../algorithms/selectionSort";

function SelectionSortVisualizer() {
  const [
    inputValue,
    setInputValue,
  ] = useState(
    "7 4 9 2 5"
  );

  const [
    numbers,
    setNumbers,
  ] = useState([
    7,
    4,
    9,
    2,
    5,
  ]);

  const {
  steps,
  stats,
} = useMemo(() => {
  return generateSelectionSortSteps(
    numbers
  );
}, [numbers]);

  const playback =
    usePlayback(
      steps.length
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

  const step =
    steps[
      playback.currentStep
    ];

  return (
    <>
      <ArrayInput
        inputValue={
          inputValue
        }
        setInputValue={
          setInputValue
        }
        onGenerate={
          generateArray
        }
      />

      <ExampleArrays
        setInputValue={
          setInputValue
        }
      />

      <BarVisualizer
        values={step.array}
        comparing={
          step.comparing
        }
        minimum={
          step.minimum
        }
        sorted={
          step.sorted
        }
      />

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

      <div className="step-indicator">
        Step{" "}
        {playback.currentStep + 1}
        {" / "}
        {steps.length}
      </div>

      <div className="stats-panel">
  <div>
    Comparisons:
    {" "}
    {stats.comparisons}
  </div>

  <div>
    Swaps:
    {" "}
    {stats.swaps}
  </div>
</div>
    </>
  );
}

export default SelectionSortVisualizer;