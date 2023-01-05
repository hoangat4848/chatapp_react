import React, { Dispatch, SetStateAction, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { AppDispatch, RootState } from "../../store";
import {
  addAttachment,
  incrementAttachmentCounter,
} from "../../store/message-panel/messagePanelSlice";
import { MessageTextArea } from "../../utils/styles";
import { ClipboardEvent, DragEvent } from "../../utils/types";

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
  const { attachments, attachmentCounter } = useSelector(
    (state: RootState) => state.messagePanel
  );
  const { error } = useToast({ theme: "dark" });
  const dispatch = useDispatch<AppDispatch>();

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
    sendTypingStatus();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      setIsMultiline(false);
      if (textAreaRef.current) textAreaRef.current.style.height = "21px";
    }
  };

  const handleFileAdd = (files: FileList) => {
    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0) return error("Max files reached");
    const filesArray = Array.from(files);
    let localCounter = attachmentCounter;
    for (let i = 0; i < filesArray.length; ++i) {
      if (i === maxFilesDropped) break;
      dispatch(addAttachment({ id: localCounter++, file: filesArray[i] }));
      dispatch(incrementAttachmentCounter());
    }
  };

  const handleOnDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("dragging");
    const { files } = e.dataTransfer;
    console.log(files);
    handleFileAdd(files);
  };

  const handleOnPaste = (e: ClipboardEvent) => {
    const { files } = e.clipboardData;
    console.log("pasting...");
    console.log(files);
    // handleFileAdd(files);
  };

  return (
    <MessageTextArea
      ref={textAreaRef}
      value={message}
      onChange={handleChange}
      maxLength={maxLength}
      onKeyDown={handleKeyDown}
      placeholder={`Send a message to ${placeholderName}`}
      onDrop={handleOnDrop}
      onPaste={handleOnPaste}
    ></MessageTextArea>
  );
};

export default MessageTextField;
