import { Dispatch, useState } from "react";
import { CharacterLimit, MessageInputContainer } from "../../utils/styles";
import { SetStateAction } from "react";
import styles from "./index.module.scss";
import MessageTextField from "../inputs/MessageTextField";
import MessageAttachmentActionIcon from "./MessageAttachmentActionIcon";

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
  const MAX_LENGTH = 2048;
  const [isMultiLine, setIsMultiLine] = useState(false);
  const atMaxLength = content.length === MAX_LENGTH;

  return (
    <>
      <MessageInputContainer isMultiLine={isMultiLine}>
        <MessageAttachmentActionIcon />
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
