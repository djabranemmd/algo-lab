function AlgorithmInfo({ data }) {
  return (
    <div className="algorithm-info">
      <h2>
        About This Algorithm
      </h2>

      <p>{data.overview}</p>

      <div className="complexity-grid">
        <div>
          <strong>Best:</strong>{" "}
          {data.timeComplexity.best}
        </div>

        <div>
          <strong>Average:</strong>{" "}
          {data.timeComplexity.average}
        </div>

        <div>
          <strong>Worst:</strong>{" "}
          {data.timeComplexity.worst}
        </div>

        <div>
          <strong>Space:</strong>{" "}
          {data.spaceComplexity}
        </div>
      </div>

      <h3>Use Cases</h3>

      <ul className="use-cases-list">
        {data.useCases.map(
          (item) => (
            <li key={item}>
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default AlgorithmInfo;