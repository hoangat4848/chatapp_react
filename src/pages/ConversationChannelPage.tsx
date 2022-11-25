import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/messages/MessagePanel";
import { AppDispatch } from "../store";
import { updateConversation } from "../store/slices/conversationSlice";
import { addMessage, fetchMessagesThunk } from "../store/slices/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { StyledConversationChannelPage } from "../utils/styles";
import { MessageEventPayload } from "../utils/types";

const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id, dispatch]);

  useEffect(() => {
    socket.emit("onClientConnect", { conversationId: parseInt(id!) });
    socket.on("onMessage", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload.conversation));
    });

    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, [socket, dispatch]);

  const sendTypingStatus = () => {
    socket.emit("onUserTyping", { conversationId: id });
  };

  return (
    <StyledConversationChannelPage>
      <MessagePanel sendTypingStatus={sendTypingStatus} />
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
