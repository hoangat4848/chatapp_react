import { useState } from "react";
import { StyledUserSidebar, UserAvatar } from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/avatar-round-2.png";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useSidebarItems } from "../../utils/constants";
import { UserSidebarItem } from "./items/UserSidebarItem";

const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <StyledUserSidebar>
        <UserAvatar src={avatar} alt="avatar" width="55px" />
        <hr className={styles.hr} />
        {useSidebarItems.map((item) => (
          <UserSidebarItem key={item.id} item={item} />
        ))}
      </StyledUserSidebar>
    </>
  );
};

export default UserSidebar;
