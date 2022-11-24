import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/messages/MessagePanel";
import { AppDispatch } from "../store";
import { fetchMessagesThunk } from "../store/slices/conversationSlice";
import { getConversationMessages } from "../utils/api";
import { SocketContext } from "../utils/context/SocketContext";
// import { getConversationMessages } from "../utils/api";
import { StyledConversationChannelPage } from "../utils/styles";
import { Message, MessageEventPayload } from "../utils/types";
// import { Message } from "../utils/types";

const ConversationChannelPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   getConversationMessages(parseInt(id!)).then(({ data }) =>
  //     setMessages(data)
  //   );
  // }, [id]);

  useEffect(() => {
    dispatch(fetchMessagesThunk(parseInt(id!)));

    return () => {};
  }, [id]);

  useEffect(() => {
    socket.on("connect", () => alert("Connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      const { conversation, ...message } = payload;
      setMessages((prev) => [message, ...prev]);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  return (
    <StyledConversationChannelPage>
      <MessagePanel messages={messages} />
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
