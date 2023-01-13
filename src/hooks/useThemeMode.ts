import { useEffect, useState } from "react";
import { SelectableTheme } from "../utils/types";

export const useThemeMode = () => {
  const [theme, setTheme] = useState<SelectableTheme>("dark");
  const setMode = (mode: SelectableTheme) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = () =>
    theme === "dark" ? setMode("light") : setMode("dark");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme as SelectableTheme);
  }, []);

  return { theme, themeToggler };
};

export default useThemeMode;
