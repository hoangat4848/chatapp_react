import { useContext } from "react";
import { ThemeContext, useTheme } from "styled-components";
import { ThemeModeContext } from "../../utils/context/ThemeModeProvider";
import { Page } from "../../utils/styles";

export const SettingsAppearancePage = () => {
  const { themeToggler } = useContext(ThemeModeContext);
  const { themeMode } = useContext(ThemeModeContext);
  console.log(themeMode);

  return (
    <Page>
      <div>
        <span>Theme</span>
        <form>
          <input
            type="radio"
            id="dark"
            name="theme"
            checked={themeMode === "dark"}
            onChange={() => themeToggler()}
          />
          <label htmlFor="dark">Dark</label>
          <input
            type="radio"
            id="light"
            name="theme"
            checked={themeMode === "light"}
            onChange={() => themeToggler()}
          />
          <label htmlFor="light">Light</label>
        </form>
      </div>
    </Page>
  );
};
