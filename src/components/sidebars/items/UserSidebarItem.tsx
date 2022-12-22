import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../../store";
import { getUserSidebarIcon } from "../../../utils/helpers";
import { IconBadge, StyledUserSidebarItem } from "../../../utils/styles";
import { UserSidebarItemType } from "../../../utils/types";
import FriendRequestList from "../../friends/FriendRequestList";

type Props = {
  item: UserSidebarItemType;
};
export const UserSidebarItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const friendRequests = useSelector(
    (state: RootState) => state.friend.friendRequests
  );
  const Icon = getUserSidebarIcon(item.id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  const isActive = () => {
    if (pathname.includes("/groups") && item.id === "conversations")
      return true;
    return pathname.includes(item.pathname);
  };

  return (
    <StyledUserSidebarItem
      onClick={() => navigate(item.pathname)}
      active={isActive()}
    >
      <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
      {item.id === "friends" && friendRequests.length > 0 && (
        <IconBadge>
          {friendRequests.length > 9 ? "10+" : friendRequests.length}
        </IconBadge>
      )}
    </StyledUserSidebarItem>
  );
};
