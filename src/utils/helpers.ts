import { Message } from "react-hook-form";
import { Conversation, User } from "./types";

export const getRecipientFromConversation = (
  user?: User,
  conversation?: Conversation
): User | undefined => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};
