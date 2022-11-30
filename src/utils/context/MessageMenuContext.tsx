import { createContext, Dispatch, SetStateAction } from "react";
import { Message } from "../types";

type MessageMenuContextType = {
  message: Message | undefined;
  editMessage: Message | undefined;
  setMessage: Dispatch<SetStateAction<Message | undefined>>;
  setEditMessage: Dispatch<SetStateAction<Message | undefined>>;
};
export const MessageMenuContext = createContext<MessageMenuContextType>({
  message: undefined,
  editMessage: undefined,
  setMessage: () => {},
  setEditMessage: () => {},
});
