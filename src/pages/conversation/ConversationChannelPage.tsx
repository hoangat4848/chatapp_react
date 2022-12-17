import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import {
  editMessage,
  fetchMessagesThunk,
} from "../../store/slices/messageSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { StyledConversationChannelPage } from "../../utils/styles";
import { Message } from "../../utils/types";

const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id, dispatch]);

  useEffect(() => {
    const conversationId = parseInt(id!);
    socket.emit("onConversationJoin", { conversationId });

    socket.on("userJoin", () => {
      console.log("Joined!!");
    });
    socket.on("userLeave", () => {
      console.log("Left!!");
    });
    socket.on("onUserTyping", () => {
      console.log("someone is typing...");
      setIsRecipientTyping(true);
    });
    socket.on("onUserStopTyping", () => {
      console.log("stop typing...");
      setIsRecipientTyping(false);
    });
    socket.on("onMessageUpdate", (payload: Message) => {
      console.log("onMessageUpdate");
      console.log(payload);
      dispatch(editMessage(payload));
    });

    return () => {
      socket.emit("onConversationLeave", { conversationId });
      socket.off("userJoin");
      socket.off("userLeave");
      socket.off("onTypingStart");
      socket.off("onUserStopTyping");
      socket.off("onMessageUpdate");
    };
  }, [id, socket]);

  const sendTypingStatus = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("onTypingStart", { conversationId: parseInt(id!) });
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("onTypingStop", { conversationId: parseInt(id!) });
    }, 3000);
  };

  return (
    <StyledConversationChannelPage>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      />
    </StyledConversationChannelPage>
  );
};

export default ConversationChannelPage;
