import { ChatAdd, Person, SignOut } from "akar-icons";
import React from "react";
import {
  StyledUserSidebar,
  UserAvatar,
  UserSidebarBottom,
  UserSidebarTop,
  UserSidebarTopIcons,
} from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/avatar-round-2.png";

const UserSidebar = () => {
  return (
    <StyledUserSidebar>
      <UserSidebarTop>
        <UserAvatar src={avatar} />
        <hr className={styles.hr} />
        <UserSidebarTopIcons>
          <ChatAdd size={38} />
          <Person size={38} />
        </UserSidebarTopIcons>
      </UserSidebarTop>
      <UserSidebarBottom>
        <SignOut size={38} />
      </UserSidebarBottom>
    </StyledUserSidebar>
  );
};

export default UserSidebar;
