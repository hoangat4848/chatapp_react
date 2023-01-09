import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ConversationSidebar from "../../components/sidebars/ConversationSidebar";
import { AppDispatch } from "../../store";
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from "../../store/slices/conversationSlice";
import { addMessage, deleteMessage } from "../../store/messages/messageSlice";
import { updateType } from "../../store/slices/selectedSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import {
  Conversation,
  DeleteMessageResponse,
  MessageEventPayload,
} from "../../utils/types";

const ConversationPage = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 800);
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleResize = () => setShowSidebar(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <>
      {showSidebar && <ConversationSidebar />}
      <Outlet />
    </>
  );
};

export default ConversationPage;
