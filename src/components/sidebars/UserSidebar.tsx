import { ChatDots, Person, ArrowCycle } from "akar-icons";
import React, { useState } from "react";
import {
  StyledUserSidebar,
  UserAvatar,
  UserSidebarItem,
} from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/avatar-round-2.png";
import CreateConversationModal from "../modals/CreateConversationModal";

const UserSidebar = () => {
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      {/* <StyledUserSidebar>
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
      </StyledUserSidebar> */}
      <StyledUserSidebar>
        <UserAvatar src={avatar} alt="avatar" width="55px" />
        <hr className={styles.hr} />
        <UserSidebarItem active>
          <ChatDots size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem>
          <Person size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem>
          <ArrowCycle size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
      </StyledUserSidebar>
    </>
  );
};

export default UserSidebar;
