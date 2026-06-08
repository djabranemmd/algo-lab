import PlaybackControls from "../controls/PlaybackControls";

import usePlayback from "../../hooks/usePlayback";

import {
  generateBFSSteps,
} from "../../algorithms/bfs";

function BFSVisualizer() {
  const steps =
    generateBFSSteps();

  const playback =
    usePlayback(
      steps.length
    );

  const step =
    steps[
      playback.currentStep
    ];

  const nodes = [
    {
      id: "A",
      x: 280,
      y: 40,
    },

    {
      id: "B",
      x: 160,
      y: 150,
    },

    {
      id: "C",
      x: 400,
      y: 150,
    },

    {
      id: "D",
      x: 90,
      y: 270,
    },

    {
      id: "E",
      x: 230,
      y: 270,
    },

    {
      id: "F",
      x: 400,
      y: 270,
    },
  ];

  const edges = [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
    ["C", "F"],
  ];

  return (
    <>
      <div className="graph-wrapper">
        <svg
          className="graph-lines"
          width="600"
          height="350"
        >
          {edges.map(
            (
              [from, to],
              index
            ) => {
              const start =
                nodes.find(
                  (n) =>
                    n.id ===
                    from
                );

              const end =
                nodes.find(
                  (n) =>
                    n.id === to
                );

              return (
                <line
                  key={index}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                />
              );
            }
          )}
        </svg>

        {nodes.map(
          (node) => {
            let className =
              "graph-node";

            if (
              step.visited.includes(
                node.id
              )
            ) {
              className +=
                " graph-visited";
            }

            if (
              step.current ===
              node.id
            ) {
              className +=
                " graph-current";
            }

            return (
              <div
                key={node.id}
                className={
                  className
                }
                style={{
                  left:
                    node.x,
                  top:
                    node.y,
                }}
              >
                {node.id}
              </div>
            );
          }
        )}
      </div>

      <div className="queue-box">
        Queue:
        {" "}
        {step.queue.length
          ? step.queue.join(
              " → "
            )
          : "Empty"}
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

export default BFSVisualizer;