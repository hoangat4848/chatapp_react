import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postNewMessage } from "../../utils/api";
import { MessagePanelBody, StyledMessagePanel } from "../../utils/styles";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
};

const MessagePanel = ({ sendTypingStatus }: Props) => {
  const [content, setContent] = useState("");
  const { id } = useParams();

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    const conversationId = parseInt(id);

    try {
      await postNewMessage({
        conversationId,
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
      </MessagePanelBody>
    </StyledMessagePanel>
  );
};

export default MessagePanel;
