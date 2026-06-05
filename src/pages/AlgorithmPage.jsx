import {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import BarVisualizer from "../components/visualizers/BarVisualizer";
import PlaybackControls from "../components/controls/PlaybackControls";

import {
  generateBubbleSortSteps,
} from "../algorithms/bubbleSort";

function AlgorithmPage() {
  const { slug } = useParams();

  const steps = useMemo(() => {
    return generateBubbleSortSteps([
      5,
      3,
      8,
      1,
      4,
    ]);
  }, []);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [speed, setSpeed] =
    useState(700);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (
          prev >=
          steps.length - 1
        ) {
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, speed);

    return () =>
      clearInterval(interval);
  }, [
    isPlaying,
    speed,
    steps.length,
  ]);

  const nextStep = () => {
    setCurrentStep((prev) =>
      Math.min(
        prev + 1,
        steps.length - 1
      )
    );
  };

  const prevStep = () => {
    setCurrentStep((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (slug !== "bubble-sort") {
    return (
      <section className="container-page">
        <Link
          to="/"
          className="back-button"
        >
          ← Back to Home
        </Link>

        <div className="glass-card">
          <h2>
            Coming Soon
          </h2>
        </div>
      </section>
    );
  }

  const step =
    steps[currentStep];

  return (
    <section className="container-page">
      <Link
        to="/"
        className="back-button"
      >
        ← Back to Home
      </Link>

      <h1 className="algorithm-title">
        Bubble Sort
      </h1>

      <BarVisualizer
        values={step.array}
        comparing={
          step.comparing
        }
        sorted={step.sorted}
      />

      <PlaybackControls
        isPlaying={isPlaying}
        onPlay={() =>
          setIsPlaying(true)
        }
        onPause={() =>
          setIsPlaying(false)
        }
        onNext={nextStep}
        onPrev={prevStep}
        onReset={reset}
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
    </section>
  );
}

export default AlgorithmPage;