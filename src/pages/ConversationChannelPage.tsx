import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/messages/MessagePanel";
import { AppDispatch } from "../store";
import { addMessage, fetchMessagesThunk } from "../store/slices/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
// import { getConversationMessages } from "../utils/api";
import { StyledConversationChannelPage } from "../utils/styles";
import { MessageEventPayload } from "../utils/types";
// import { Message } from "../utils/types";

const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id, dispatch]);

  useEffect(() => {
    socket.on("connect", () => alert("Connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]);

  return (
    <StyledConversationChannelPage>
      <MessagePanel />
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
