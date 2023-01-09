import { useContext } from "react";
import { StyledUserSidebar, UserAvatarContainer } from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/default-avatar.png";
import { useSidebarItems } from "../../utils/constants";
import { UserSidebarItem } from "./items/UserSidebarItem";
import { AuthContext } from "../../utils/context/AuthContext";
import { getImageUrl } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const avatarSource = user?.profile?.avatar
    ? getImageUrl(user.profile.avatar)
    : avatar;

  return (
    <>
      <StyledUserSidebar>
        <UserAvatarContainer
          src={avatarSource}
          alt="avatar"
          width="55px"
          onClick={() => navigate("/settings/profile")}
        />
        <hr className={styles.hr} />
        {useSidebarItems.map((item) => (
          <UserSidebarItem key={item.id} item={item} />
        ))}
      </StyledUserSidebar>
    </>
  );
};

export default UserSidebar;
