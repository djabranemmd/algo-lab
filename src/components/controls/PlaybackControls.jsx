function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  speed,
  setSpeed,
}) {
  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={onPrev}>
          ⏮ Prev
        </button>

        {isPlaying ? (
          <button onClick={onPause}>
            ⏸ Pause
          </button>
        ) : (
          <button onClick={onPlay}>
            ▶ Start
          </button>
        )}

        <button onClick={onNext}>
          ⏭ Next
        </button>

        <button onClick={onReset}>
          🔄 Reset
        </button>
      </div>

      <div className="speed-control">
        <span>Speed</span>

        <select
          value={speed}
          onChange={(e) =>
            setSpeed(
              Number(e.target.value)
            )
          }
        >
          <option value={1200}>
            Slow
          </option>

          <option value={700}>
            Normal
          </option>

          <option value={350}>
            Fast
          </option>
        </select>
      </div>
    </div>
  );
}

export default PlaybackControls;