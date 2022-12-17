import { Crown } from "akar-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useResize from "../../hooks/useResize";
import { AppDispatch, RootState } from "../../store";
import {
  setContextMenuLocation,
  setSelectedUser,
  setShowContextMenu,
} from "../../store/slices/groupRecipientsSidebarSlice";
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
import SelectedParticipantContextMenu from "../context-menus/SelectedParticipantContextMenu";

const GroupRecipientsSidebar = () => {
  const { id: groupId } = useParams();
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );

  const { location, showUserContextMenu } = useSelector(
    (state: RootState) => state.groupSidebar
  );

  useEffect(() => {
    socket.emit("getOnlineGroupUsers", { groupId: parseInt(groupId!) });
    const interval = setInterval(() => {
      console.log(`Pinging Group${groupId}`);
      socket.emit("getOnlineGroupUsers", { groupId: parseInt(groupId!) });
    }, 5000);

    socket.on("onlineGroupUsersReceived", (payload) => {
      setOnlineUsers(payload.onlineUsers);
      setOfflineUsers(payload.offlineUsers);
    });
    return () => {
      console.log("Clearing interval for groupRecipientsSidebar");
      clearInterval(interval);
      socket.off("onlineGroupUsersReceived");
    };
  }, [groupId, socket]);

  useEffect(() => {
    const handleClick = () => dispatch(setShowContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [groupId, dispatch]);

  const handleResize = useCallback(
    (e: UIEvent) => dispatch(setShowContextMenu(false)),
    [dispatch]
  );
  useResize(handleResize);

  const handleUserContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User
  ) => {
    e.preventDefault();
    dispatch(setShowContextMenu(true));
    const contextMenuLocation = { x: e.pageX, y: e.pageY };
    dispatch(setContextMenuLocation(contextMenuLocation));
    dispatch(setSelectedUser(user));
  };

  return (
    <StyledGroupRecipientsSidebar>
      {showUserContextMenu && (
        <SelectedParticipantContextMenu location={location} />
      )}

      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
      </GroupRecipientsSidebarHeader>
      <GroupRecipientsSidebarItemContainer>
        <p>Online Users</p>
        {onlineUsers.map((user) => (
          <GroupRecipientsSidebarItem
            key={user.id}
            onContextMenu={(e) => handleUserContextMenu(e, user)}
          >
            <div className="left">
              <MessageItemAvatar />
              {user.email}
            </div>
            {user.id === group?.owner.id && <Crown color="#ffbf00" />}
          </GroupRecipientsSidebarItem>
        ))}
        <p>Offline Users</p>
        {offlineUsers.map((user) => (
          <GroupRecipientsSidebarItem
            key={user.id}
            onContextMenu={(e) => handleUserContextMenu(e, user)}
          >
            <div className="left">
              <MessageItemAvatar />
              {user.email}
            </div>
            {user.id === group?.owner.id && <Crown color="#ffbf00" />}
          </GroupRecipientsSidebarItem>
        ))}
      </GroupRecipientsSidebarItemContainer>
    </StyledGroupRecipientsSidebar>
  );
};

export default GroupRecipientsSidebar;
