import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ThemeContext } from "styled-components";
import { ThemeModeContext } from "../../utils/context/ThemeModeProvider";
import { Page } from "../../utils/styles";
import { SelectableTheme } from "../../utils/types";

export const SettingsAppearancePage = () => {
  const { themeToggler } = useContext(ThemeModeContext);

  return (
    <Page>
      <div>
        <span>Theme</span>
        <form>
          <input
            type="radio"
            id="dark"
            name="theme"
            onChange={() => themeToggler()}
          />
          <label htmlFor="dark">Dark</label>
          <input
            type="radio"
            id="light"
            name="theme"
            onChange={() => themeToggler()}
          />
          <label htmlFor="light">Light</label>
        </form>
      </div>
    </Page>
  );
};
