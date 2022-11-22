import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/messages/MessagePanel";
import { getConversationMessages } from "../utils/api";
// import { getConversationMessages } from "../utils/api";
import { StyledConversationChannelPage } from "../utils/styles";
import { Message } from "../utils/types";
// import { Message } from "../utils/types";

const ConversationChannelPage = () => {
  const { id } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getConversationMessages(parseInt(id!)).then(({ data }) =>
      setMessages(data)
    );
  }, [id]);

  return (
    <StyledConversationChannelPage>
      <MessagePanel messages={messages} />
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
