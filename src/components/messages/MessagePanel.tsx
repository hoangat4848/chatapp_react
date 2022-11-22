import React from "react";
import { MessagePanelBody, StyledMessagePanel } from "../../utils/styles";
import { Message } from "../../utils/types";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  messages: Message[];
};

const MessagePanel = ({ messages }: Props) => {
  return (
    <StyledMessagePanel>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer messages={messages} />
        <MessageInputField />
      </MessagePanelBody>
    </StyledMessagePanel>
  );
};

export default MessagePanel;
