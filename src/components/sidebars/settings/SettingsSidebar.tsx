import { settingsItem } from "../../../utils/constants";
import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  StyledSettingsSidebar,
} from "../../../utils/styles/settings";
import SettingsSidebarItem from "../items/SettingsSidebarItem";

const SettingsSidebar = () => {
  return (
    <StyledSettingsSidebar>
      <SettingsSidebarHeader>
        <span>Settings</span>
      </SettingsSidebarHeader>
      <SettingsSidebarItemContainer>
        {settingsItem.map((item) => (
          <SettingsSidebarItem key={item.id} item={item} />
        ))}
      </SettingsSidebarItemContainer>
    </StyledSettingsSidebar>
  );
};

export default SettingsSidebar;
