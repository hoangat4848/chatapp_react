import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageItemContent, StyledOverlay } from "../../utils/styles";
import { GroupMessageType, Message } from "../../utils/types";
import EditMessageContainer from "./EditMessageContainer";
import MessageItemAttachmentContainer from "./MessageItemAttachmentContainer";

type Props = {
  message: Message | GroupMessageType;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding: string;
};
const MessageItemContainerBody = ({
  message,
  onEditMessageChange,
  padding,
}: Props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  return (
    <>
      {showOverlay && (
        <StyledOverlay>
          <MdClose
            className={styles.closeIcon}
            onClick={() => setShowOverlay(false)}
          />
          <img src={imageUrl} alt="overlay" />
        </StyledOverlay>
      )}
      {isEditingMessage && messageBeingEdited?.id ? (
        <MessageItemContent padding={padding}>
          <EditMessageContainer onEditMessageChange={onEditMessageChange} />
        </MessageItemContent>
      ) : (
        <MessageItemContent padding={padding}>
          {message.content || null}
          <MessageItemAttachmentContainer message={message} />
        </MessageItemContent>
      )}
    </>
  );
};

export default MessageItemContainerBody;
