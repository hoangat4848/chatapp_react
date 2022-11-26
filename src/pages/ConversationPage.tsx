import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ConversationSidebar from "../components/conversations/ConversationSidebar";
import { AppDispatch } from "../store";
import {
  fetchConversationsThunk,
  updateConversation,
} from "../store/slices/conversationSlice";
import { addMessage } from "../store/slices/messageSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { Page } from "../utils/styles";
import { MessageEventPayload } from "../utils/types";

const ConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

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

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};

export default ConversationPage;
