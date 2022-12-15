import { PeopleGroup } from "akar-icons";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectGroupById } from "../../store/slices/groupSlice";
import { SocketContext } from "../../utils/context/SocketContext";
import {
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarItem,
  GroupRecipientsSidebarItemContainer,
  MessageItemAvatar,
  StyledGroupRecipientsSidebar,
} from "../../utils/styles";
import { User } from "../../utils/types";

const GroupRecipientsSidebar = () => {
  const { id: groupId } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId: parseInt(groupId!) });
    const interval = setInterval(() => {
      console.log(`Pinging Group${groupId}`);
      socket.emit("getOnlineGroupUsers", { groupId: parseInt(groupId!) });
    }, 10000);

    socket.on("onlineGroupUsersReceived", (payload) => {
      console.log("received payload for online users");
      console.log(payload);
      setOnlineUsers(payload.onlineUsers);
      setOfflineUsers(payload.offlineUsers);
    });
    return () => {
      console.log("Clearing interval for groupRecipientsSidebar");
      clearInterval(interval);
      socket.off();
    };
  }, [groupId, socket]);

  return (
    <StyledGroupRecipientsSidebar>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
        <PeopleGroup size={24} strokeWidth={2} />
      </GroupRecipientsSidebarHeader>
      <GroupRecipientsSidebarItemContainer>
        <p>Online Users</p>
        {onlineUsers.map((user) => (
          <GroupRecipientsSidebarItem key={user.id}>
            <MessageItemAvatar />
            {user.email}
          </GroupRecipientsSidebarItem>
        ))}
        <p>Offline Users</p>
        {offlineUsers.map((user) => (
          <GroupRecipientsSidebarItem key={user.id}>
            <MessageItemAvatar />
            {user.email}
          </GroupRecipientsSidebarItem>
        ))}
      </GroupRecipientsSidebarItemContainer>
    </StyledGroupRecipientsSidebar>
  );
};

export default GroupRecipientsSidebar;
