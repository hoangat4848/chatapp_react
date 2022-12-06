import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../../components/conversations/ConversationSidebar";
import { AppDispatch } from "../../store";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from "../../store/slices/conversationSlice";
import { addMessage, deleteMessage } from "../../store/slices/messageSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { Page } from "../../utils/styles";
import {
  Conversation,
  DeleteMessageResponse,
  MessageEventPayload,
} from "../../utils/types";

const ConversationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType("private"));
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on("onMessage", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload.conversation));
    });
    socket.on("onConversation", (payload: Conversation) => {
      dispatch(addConversation(payload));
    });
    socket.on("onMessageDelete", (payload: DeleteMessageResponse) => {
      dispatch(deleteMessage(payload));
    });

    return () => {
      socket.off("onMessage");
      socket.off("onConversation");
      socket.off("onMessageDelete");
    };
  }, [socket, dispatch]);

  return (
    <Page>
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
