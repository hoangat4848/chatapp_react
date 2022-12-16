import { Crown, Minus, PersonCross } from "akar-icons";
import { Message } from "react-hook-form";
import { userContextMenuItems } from "./constants";
import { Conversation, Group, User, UserContextMenuActionType } from "./types";

export const getRecipientFromConversation = (
  user?: User,
  conversation?: Conversation
): User | undefined => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
  switch (type) {
    case "kick":
      return { icon: PersonCross, color: "#ff0000" };
    case "transfer_owner":
      return { icon: Crown, color: "#FFB800" };
    default:
      return { icon: Minus, color: "#7c7c7c" };
  }
};

export const getUserContextMenuActions = (user?: User, group?: Group) => {
  if (!user || !group) return [];
  return user.id === group.creator.id
    ? userContextMenuItems
    : userContextMenuItems.filter((item) => !item.ownerOnly);
};
