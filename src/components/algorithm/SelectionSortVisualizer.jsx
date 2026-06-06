import {
  useMemo,
  useState,
  useEffect,
} from "react";

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

  const [
    currentStep,
    setCurrentStep,
  ] = useState(0);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    speed,
    setSpeed,
  ] = useState(700);

  const steps = useMemo(() => {
    return generateSelectionSortSteps(
      numbers
    );
  }, [numbers]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval =
      setInterval(() => {
        setCurrentStep(
          (prev) => {
            if (
              prev >=
              steps.length - 1
            ) {
              setIsPlaying(
                false
              );

              return prev;
            }

            return prev + 1;
          }
        );
      }, speed);

    return () =>
      clearInterval(
        interval
      );
  }, [
    isPlaying,
    speed,
    steps.length,
  ]);

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

      setCurrentStep(0);

      setIsPlaying(false);
    };

  const step =
    steps[currentStep];

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
          isPlaying
        }
        onPlay={() =>
          setIsPlaying(
            true
          )
        }
        onPause={() =>
          setIsPlaying(
            false
          )
        }
        onNext={() =>
          setCurrentStep(
            (prev) =>
              Math.min(
                prev + 1,
                steps.length - 1
              )
          )
        }
        onPrev={() =>
          setCurrentStep(
            (prev) =>
              Math.max(
                prev - 1,
                0
              )
          )
        }
        onReset={() => {
          setCurrentStep(0);
          setIsPlaying(false);
        }}
        speed={speed}
        setSpeed={setSpeed}
      />

      <div className="description-box">
        {step.description}
      </div>

      <div className="step-indicator">
        Step {currentStep + 1}
        {" / "}
        {steps.length}
      </div>
    </>
  );
}

export default SelectionSortVisualizer;