import {
  ArrowCycle,
  ChatDots,
  Crown,
  Gear,
  Minus,
  Person,
  PersonCross,
} from "akar-icons";
import {
  IoIosPerson,
  IoIosLock,
  IoIosNotifications,
  IoMdInfinite,
  IoMdColorPalette,
} from "react-icons/io";
import { PUBLIC_URL } from "./constants";
import {
  Conversation,
  Friend,
  FriendRequest,
  FriendRequestDetail,
  Group,
  SettingsSidebarRouteType,
  User,
  UserContextMenuActionType,
  UserSidebarRoute,
} from "./types";

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

export const getFriendUsernameFromFriend = (
  friend?: Friend,
  userId?: number
) => {
  if (!userId || !friend) return "";

  return userId === friend.sender.id
    ? friend.receiver.username
    : friend.sender.username;
};

export const getUserSidebarIcon = (id: UserSidebarRoute) => {
  switch (id) {
    case "conversations":
      return ChatDots;
    case "friends":
      return Person;
    case "connections":
      return ArrowCycle;
    case "settings":
      return Gear;
    default:
      throw new Error("invalid id in getIcon");
  }
};

export const getSettingsSidebarIcon = (id: SettingsSidebarRouteType) => {
  switch (id) {
    case "profile":
      return IoIosPerson;
    case "security":
      return IoIosLock;
    case "notifications":
      return IoIosNotifications;
    case "integrations":
      return IoMdInfinite;
    case "appearance":
      return IoMdColorPalette;
    default:
      throw new Error("Invalid Settings Sidebar Item Id");
  }
};

export const getImageUrl = (imageName: string) => {
  if (!imageName) return "";
  return PUBLIC_URL.concat(imageName);
};

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User
): FriendRequestDetail => {
  return user?.id === receiver.id
    ? {
        status: "Incoming Friend Request",
        displayName: `${sender.firstName} ${sender.lastName}`,
        user: sender,
        incoming: true,
      }
    : {
        status: "Outgoing Friend Request",
        displayName: `${receiver.firstName} ${receiver.lastName}`,
        user: receiver,
        incoming: false,
      };
};
