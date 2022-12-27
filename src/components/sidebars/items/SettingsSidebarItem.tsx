import { useLocation, useNavigate } from "react-router-dom";
import { getSettingsSidebarIcon } from "../../../utils/helpers";
import { StyledSettingsSidebarItem } from "../../../utils/styles/settings";
import { SettingsItem } from "../../../utils/types";

type Props = {
  item: SettingsItem;
};
const SettingsSidebarItem = ({ item }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const Icon = getSettingsSidebarIcon(item.id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  return (
    <StyledSettingsSidebarItem
      isActive={item.pathname === pathname}
      onClick={() => navigate(item.pathname)}
    >
      <div className="settingItem">
        <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        <span>{item.label}</span>
      </div>
    </StyledSettingsSidebarItem>
  );
};

export default SettingsSidebarItem;
