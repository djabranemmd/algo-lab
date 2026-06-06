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

  const [
    error,
    setError,
  ] = useState("");

  const steps = useMemo(() => {
    return generateBubbleSortSteps(
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

      setCurrentStep(0);

      setIsPlaying(false);
    };

  const nextStep = () => {
    setCurrentStep(
      (prev) =>
        Math.min(
          prev + 1,
          steps.length - 1
        )
    );
  };

  const prevStep = () => {
    setCurrentStep(
      (prev) =>
        Math.max(
          prev - 1,
          0
        )
    );
  };

  const reset = () => {
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
        onNext={nextStep}
        onPrev={prevStep}
        onReset={reset}
        speed={speed}
        setSpeed={setSpeed}
      />

      <div className="description-box">
        {
          step.description
        }
      </div>

      <div className="step-indicator">
        Step{" "}
        {currentStep + 1}
        {" / "}
        {steps.length}
      </div>
    </>
  );
}

export default BubbleSortVisualizer;