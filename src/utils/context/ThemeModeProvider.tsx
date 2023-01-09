import { createContext, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import useThemeMode from "../../hooks/useThemeMode";
import { DarkTheme, LightTheme } from "../theme";

export type ThemeModeContextType = {
  themeToggler: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextType>({
  themeToggler: () => {},
});

const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const { theme, themeToggler } = useThemeMode();

  const themeMode = theme === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeModeContext.Provider value={{ themeToggler }}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
