import { ChatDots, Person, ArrowCycle } from "akar-icons";
import { useState } from "react";
import {
  StyledUserSidebar,
  UserAvatar,
  StyledUserSidebarItem,
} from "../../utils/styles";
import styles from "./index.module.scss";
import avatar from "../../__assets__/avatar-round-2.png";
import CreateConversationModal from "../modals/CreateConversationModal";
import { UserSidebarItemType, UserSidebarRoute } from "../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebarItems } from "../../utils/constants";

export const getIcon = (id: UserSidebarRoute) => {
  switch (id) {
    case "conversations":
      return ChatDots;
    case "friends":
      return Person;
    case "connections":
      return ArrowCycle;
    default:
      throw new Error("invalid id in getIcon");
  }
};

type Props = {
  item: UserSidebarItemType;
};
export const UserSidebarItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const Icon = getIcon(item.id);
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
    </StyledUserSidebarItem>
  );
};

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
