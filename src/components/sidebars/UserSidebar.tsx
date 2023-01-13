import { useContext } from "react";
import {
  StyledUserSidebar,
  UserAvatarContainer,
  UserSidebarFooter,
  UserSidebarHeader,
  UserSidebarScrollableContainer,
} from "../../utils/styles";
import avatar from "../../__assets__/default-avatar.png";
import { useSidebarItems } from "../../utils/constants";
import { UserSidebarItem } from "./items/UserSidebarItem";
import { AuthContext } from "../../utils/context/AuthContext";
import { getImageUrl } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logoutUser as logoutUserAPI } from "../../utils/api";
import { SocketContext } from "../../utils/context/SocketContext";

const UserSidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const avatarSource = user?.profile?.avatar
    ? getImageUrl(user.profile.avatar)
    : avatar;

  const logoutUser = () => {
    logoutUserAPI().finally(() => navigate("/login", { replace: true }));
    socket.disconnect();
  };

  return (
    <>
      <StyledUserSidebar>
        <UserSidebarHeader>
          <UserAvatarContainer
            src={avatarSource}
            alt="avatar"
            width="55px"
            onClick={() => navigate("/settings/profile")}
          />
        </UserSidebarHeader>
        <UserSidebarScrollableContainer>
          {useSidebarItems.map((item) => (
            <UserSidebarItem key={item.id} item={item} />
          ))}
        </UserSidebarScrollableContainer>

        <UserSidebarFooter>
          <RiLogoutCircleLine
            size={30}
            onClick={() => logoutUser()}
            cursor="pointer"
          />
        </UserSidebarFooter>
      </StyledUserSidebar>
    </>
  );
};

export default UserSidebar;
