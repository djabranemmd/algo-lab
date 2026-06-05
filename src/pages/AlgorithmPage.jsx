import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

import BarVisualizer from "../components/visualizers/BarVisualizer";
import ControlPanel from "../components/controls/ControlPanel";

import { generateBubbleSortSteps } from "../algorithms/bubbleSort";

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

  const nextStep = () => {
    setCurrentStep((prev) =>
      Math.min(
        prev + 1,
        steps.length - 1
      )
    );
  };

  const reset = () => {
    setCurrentStep(0);
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
        values={
          steps[currentStep]
        }
      />

      <ControlPanel
        onNext={nextStep}
        onReset={reset}
      />

      <div className="step-indicator">
        Step {currentStep + 1}
        {" / "}
        {steps.length}
      </div>
    </section>
  );
}

export default AlgorithmPage;