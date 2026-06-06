function ArrayInput({
  inputValue,
  setInputValue,
  onGenerate,
}) {
  return (
    <div className="array-input-card">
      <label className="input-label">
        Enter numbers separated by spaces
      </label>

      <input
        type="text"
        value={inputValue}
        onChange={(e) =>
          setInputValue(e.target.value)
        }
        placeholder="10 7 3 15 2 8"
        className="array-input"
      />

      <button
        onClick={onGenerate}
        className="generate-btn"
      >
        Generate Visualization
      </button>
    </div>
  );
}

export default ArrayInput;