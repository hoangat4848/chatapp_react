import React, { Dispatch, SetStateAction, useRef } from "react";
import { MessageTextArea } from "../../utils/styles";

type Props = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  maxLength: number;
  setIsMultiline: Dispatch<SetStateAction<boolean>>;
  sendTypingStatus: () => void;
  sendMessage: () => void;
  placeholderName: string;
};
const MessageTextField = ({
  message,
  setMessage,
  maxLength,
  sendMessage,
  sendTypingStatus,
  setIsMultiline,
  placeholderName,
}: Props) => {
  const DEFAULT_TEXTAREA_HEIGHT = 21;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    const { current } = textAreaRef;
    if (current) {
      const height = parseInt(current.style.height);
      current.style.height = "5px";
      current.style.height = current.scrollHeight + "px";
      setIsMultiline(height > DEFAULT_TEXTAREA_HEIGHT ? true : false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log("on Key downnn");
    sendTypingStatus();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setIsMultiline(false);
      if (textAreaRef.current) textAreaRef.current.style.height = "21px";
    }
  };

  return (
    <MessageTextArea
      ref={textAreaRef}
      value={message}
      onChange={handleChange}
      maxLength={maxLength}
      onKeyDown={handleKeyDown}
      placeholder={`Send a message to ${placeholderName}`}
    ></MessageTextArea>
  );
};

export default MessageTextField;
