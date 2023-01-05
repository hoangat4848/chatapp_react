import { useContext, useState } from "react";
import { StyledUserSidebar, UserAvatar } from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/default-avatar.png";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useSidebarItems } from "../../utils/constants";
import { UserSidebarItem } from "./items/UserSidebarItem";
import { AuthContext } from "../../utils/context/AuthContext";
import { getImageUrl } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const avatarSource = user?.profile?.avatar
    ? getImageUrl(user.profile.avatar)
    : avatar;

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <StyledUserSidebar>
        <UserAvatar
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
