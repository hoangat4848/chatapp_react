import { ChatAdd, Person, SignOut } from "akar-icons";
import React, { useState } from "react";
import {
  StyledUserSidebar,
  UserAvatar,
  UserSidebarBottom,
  UserSidebarTop,
  UserSidebarTopIcons,
} from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/avatar-round-2.png";
import CreateConversationModal from "../modals/CreateConversationModal";

const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <StyledUserSidebar>
        <UserSidebarTop>
          <UserAvatar src={avatar} />
          <hr className={styles.hr} />
          <UserSidebarTopIcons>
            <ChatAdd size={38} onClick={() => setShowModal(true)} />
            <Person size={38} />
          </UserSidebarTopIcons>
        </UserSidebarTop>
        <UserSidebarBottom>
          <SignOut size={38} />
        </UserSidebarBottom>
      </StyledUserSidebar>
    </>
  );
};

export default UserSidebar;
