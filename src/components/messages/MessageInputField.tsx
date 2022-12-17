import React, { Dispatch, useState } from "react";
import {
  CharacterLimit,
  MessageInput,
  MessageInputContainer,
} from "../../utils/styles";
import { SetStateAction } from "react";
import styles from "./index.module.scss";
import { CirclePlusFill, FaceVeryHappy } from "akar-icons";
import MessageTextField from "../inputs/MessageTextField";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
  sendTypingStatus: () => void;
  placeholderName: string;
};

const MessageInputField = ({
  content,
  setContent,
  sendMessage,
  sendTypingStatus,
  placeholderName,
}: Props) => {
  const ICON_SIZE = 36;
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;

  return (
    <>
      <MessageInputContainer isMultiLine={isMultiLine}>
        <CirclePlusFill className={styles.icon} size={ICON_SIZE} />
        <form onSubmit={sendMessage} className={styles.form}>
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiline={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
            placeholderName={placeholderName}
          />
        </form>
        <FaceVeryHappy className={styles.icon} size={ICON_SIZE} />
        {atMaxLength && (
          <CharacterLimit atMaxLength={atMaxLength}>
            {`${content.length}/${MAX_LENGTH}`}
          </CharacterLimit>
        )}
      </MessageInputContainer>
    </>
  );
};

export default MessageInputField;
