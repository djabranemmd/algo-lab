import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-wrapper">
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <div
          className={`toggle-track ${
            theme === "dark" ? "dark" : "light"
          }`}
        >
          <div className="toggle-thumb">
            {theme === "dark" ? "🌙" : "☀️"}
          </div>
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;