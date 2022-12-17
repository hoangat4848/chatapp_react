import { Crown, Minus, PersonCross } from "akar-icons";
import { Conversation, Group, User, UserContextMenuActionType } from "./types";

export const getRecipientFromConversation = (
  user?: User,
  conversation?: Conversation
): User | undefined => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const getRecipientFullnameFromConversation = (
  user?: User,
  conversation?: Conversation
) => {
  if (!user || !conversation) return;
  const { creator, recipient } = conversation;
  return user.id === creator.id
    ? `${recipient.firstName} ${recipient.lastName}`
    : `${creator.firstName} ${creator.lastName}`;
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

export const isGroupOwner = (user?: User, group?: Group) =>
  user?.id === group?.owner.id;
