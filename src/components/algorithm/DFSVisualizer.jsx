import PlaybackControls from "../controls/PlaybackControls";
import GraphVisualizer from "../visualizers/GraphVisualizer";

import usePlayback from "../../hooks/usePlayback";

import {
  generateDFSSteps,
} from "../../algorithms/dfs";

function DFSVisualizer() {
  const steps =
    generateDFSSteps();

  const playback =
    usePlayback(
      steps.length
    );

  const step =
    steps[
      playback.currentStep
    ];

  return (
    <>
      <GraphVisualizer
        current={
          step.current
        }
        visited={
          step.visited
        }
      />

      <div className="traversal-box">
        Traversal Order:
        {" "}
        {step.traversal.join(
          " → "
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

      <div className="step-indicator">
        Step{" "}
        {playback.currentStep + 1}
        {" / "}
        {steps.length}
      </div>
    </>
  );
}

export default DFSVisualizer;