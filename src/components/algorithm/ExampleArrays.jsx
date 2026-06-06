function ExampleArrays({
  setInputValue,
}) {
  const randomArray = () => {
    const arr = Array.from(
      { length: 8 },
      () =>
        Math.floor(
          Math.random() * 50
        ) + 1
    );

    setInputValue(
      arr.join(" ")
    );
  };

  const nearlySorted = () => {
    setInputValue(
      "1 2 3 5 4 6 7 8"
    );
  };

  const reverseSorted = () => {
    setInputValue(
      "8 7 6 5 4 3 2 1"
    );
  };

  return (
    <div className="examples-wrapper">
      <button
        onClick={randomArray}
      >
        Random Array
      </button>

      <button
        onClick={nearlySorted}
      >
        Nearly Sorted
      </button>

      <button
        onClick={reverseSorted}
      >
        Reverse Sorted
      </button>
    </div>
  );
}

export default ExampleArrays;