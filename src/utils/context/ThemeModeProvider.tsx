import { createContext, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import useThemeMode from "../../hooks/useThemeMode";
import { DarkTheme, LightTheme } from "../theme";
import { SelectableTheme } from "../types";

export type ThemeModeContextType = {
  themeMode: SelectableTheme | undefined;
  themeToggler: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextType>({
  themeMode: undefined,
  themeToggler: () => {},
});

const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const { theme, themeToggler } = useThemeMode();

  const themeMode = theme === "dark" ? DarkTheme : LightTheme;
  return (
    <ThemeModeContext.Provider value={{ themeMode: theme, themeToggler }}>
      <ThemeProvider theme={themeMode}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
