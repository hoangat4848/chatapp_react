import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { postNewMessage } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import {
  MessagePanelBody,
  MessageTypingStatus,
  StyledMessagePanel,
} from "../../utils/styles";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isRecipientTyping: boolean;
};

const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(user, conversation);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    const conversationId = parseInt(id);

    try {
      await postNewMessage(conversationId, {
        content,
      });
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledMessagePanel>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer />
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
          sendTypingStatus={sendTypingStatus}
        />
        <MessageTypingStatus>
          {isRecipientTyping && `${recipient?.firstName} is typing...`}
        </MessageTypingStatus>
      </MessagePanelBody>
    </StyledMessagePanel>
  );
};

export default MessagePanel;
