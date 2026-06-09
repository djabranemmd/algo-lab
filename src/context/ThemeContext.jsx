import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext(null);

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] =
    useState(() => {
      return (
        localStorage.getItem(
          "theme"
        ) || "dark"
      );
    });

  useEffect(() => {
    document.body.classList.remove(
      "theme-dark",
      "theme-light"
    );

    document.body.classList.add(
      `theme-${theme}`
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const toggleTheme =
    () => {
      setTheme((prev) =>
        prev === "dark"
          ? "light"
          : "dark"
      );
    };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(
    ThemeContext
  );
}