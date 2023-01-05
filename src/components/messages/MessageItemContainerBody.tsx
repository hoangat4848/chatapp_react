import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageItemContent } from "../../utils/styles";
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
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  return (
    <>
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
