import { createContext, Dispatch, SetStateAction } from "react";
import { Message } from "../types";

type MessageMenuContextType = {
  message?: Message;
  setMessage: Dispatch<SetStateAction<Message | undefined>>;
};
export const MessageMenuContext = createContext<MessageMenuContextType>({
  setMessage: () => {},
});
