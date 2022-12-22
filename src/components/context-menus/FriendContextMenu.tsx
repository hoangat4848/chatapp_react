import { useContext } from "react";
import { MdOutlineTextsms, MdPersonRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setShowContextMenu } from "../../store/friends/friendSlice";
import { removeFriendThunk } from "../../store/friends/friendThunk";
import { SocketContext } from "../../utils/context/SocketContext";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";

const FriendContextMenu = () => {
  const ICON_SIZE = 20;
  const dispatch = useDispatch<AppDispatch>();
  const { contextMenuLocation, selectedFriendContextMenu } = useSelector(
    (state: RootState) => state.friend
  );
  const socket = useContext(SocketContext);

  const removeFriend = () => {
    if (!selectedFriendContextMenu) return;
    dispatch(setShowContextMenu(false));
    dispatch(removeFriendThunk(selectedFriendContextMenu.id)).then(() =>
      socket.emit("getOnlineFriends")
    );
  };

  return (
    <ContextMenu top={contextMenuLocation.y} left={contextMenuLocation.x}>
      <ContextMenuItem onClick={removeFriend}>
        <MdPersonRemove size={ICON_SIZE} color="#ff0000" />
        <span style={{ color: "#ff0000" }}>Remove Friend</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <MdOutlineTextsms size={ICON_SIZE} color="#fff" />
        <span style={{ color: "#fff" }}>Message</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default FriendContextMenu;
