import React, { Dispatch } from "react";
import { MessageInput, MessageInputContainer } from "../../utils/styles";
import { SetStateAction } from "react";
import styles from "./index.module.scss";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  sendTypingStatus: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholderName: string;
};

const MessageInputField = ({
  content,
  setContent,
  sendMessage,
  sendTypingStatus,
  placeholderName,
}: Props) => {
  return (
    <>
      <MessageInputContainer>
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={sendTypingStatus}
            placeholder={`Send a message to ${placeholderName}`}
          />
        </form>
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
