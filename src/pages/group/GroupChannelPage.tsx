import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessagePanel from "../../components/messages/MessagePanel";
import { AppDispatch } from "../../store";
import { fetchGroupMessagesThunk } from "../../store/slices/groupMessageSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import { StyledConversationChannelPage } from "../../utils/styles";

const GroupChannelPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    const groupId = parseInt(id!);
    dispatch(fetchGroupMessagesThunk(groupId));
  }, [id, dispatch]);

  useEffect(() => {
    const groupId = parseInt(id!);
    socket.emit("onGroupJoin", { groupId });
    socket.on("userJoinGroup", () => {
      console.log(`someone join group ${groupId}`);
    });
    socket.on("userLeaveGroup", () => {
      console.log(`someone leave group ${groupId}`);
    });

    return () => {
      socket.emit("onGroupLeave", { groupId });
      socket.off("userJoinGroup");
      socket.off("userLeaveGroup");
    };
  }, [socket, id]);

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
