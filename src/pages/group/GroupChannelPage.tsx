import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { StyledConversationChannelPage } from "../../utils/styles";

const GroupChannelPage = () => {
  const { id } = useParams();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  const sendTypingStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {};

  return (
    <StyledConversationChannelPage>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      />
    </StyledConversationChannelPage>
  );
};

export default GroupChannelPage;
