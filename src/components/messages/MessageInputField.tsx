import React, { Dispatch } from "react";
import { MessageInput, MessageInputContainer } from "../../utils/styles";
import { SetStateAction } from "react";
import styles from "./index.module.scss";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MessageInputField = ({ content, setContent, sendMessage }: Props) => {
  return (
    <MessageInputContainer>
      <form onSubmit={sendMessage} className={styles.form}>
        <MessageInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></MessageInput>
      </form>
    </MessageInputContainer>
  );
};

export default MessageInputField;
