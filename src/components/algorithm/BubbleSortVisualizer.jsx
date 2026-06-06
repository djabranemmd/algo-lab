import { useMemo, useState } from "react";

import usePlayback from "../../hooks/usePlayback";

import ArrayInput from "./ArrayInput";
import ExampleArrays from "./ExampleArrays";

import BarVisualizer from "../visualizers/BarVisualizer";
import PlaybackControls from "../controls/PlaybackControls";

import {
  generateBubbleSortSteps,
} from "../../algorithms/bubbleSort";

function BubbleSortVisualizer() {
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

  const [
    error,
    setError,
  ] = useState("");

  const steps = useMemo(() => {
    return generateBubbleSortSteps(
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

      const invalid =
        parsed.some(
          Number.isNaN
        );

      if (
        invalid ||
        parsed.length < 2
      ) {
        setError(
          "Please enter valid numbers."
        );

        return;
      }

      setError("");

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

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <BarVisualizer
        values={step.array}
        comparing={
          step.comparing
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
    </>
  );
}

export default BubbleSortVisualizer;