function ControlPanel({
  onNext,
  onReset,
}) {
  return (
    <div className="controls">
      <button
        onClick={onNext}
      >
        Next Step
      </button>

      <button
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default ControlPanel;