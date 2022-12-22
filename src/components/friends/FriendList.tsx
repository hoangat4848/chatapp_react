import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useResize from "../../hooks/useResize";
import { AppDispatch, RootState } from "../../store";
import {
  setContextMenuLocation,
  setSelectedFriend,
  setShowContextMenu,
} from "../../store/friends/friendSlice";
import { FriendListContainer } from "../../utils/styles/friends";
import { ContextMenuEvent, Friend } from "../../utils/types";
import FriendContextMenu from "../context-menus/FriendContextMenu";
import FriendListItem from "./FriendListItem";

const FriendList = () => {
  const { showContextMenu, onlineFriends, offlineFriends } = useSelector(
    (state: RootState) => state.friend
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleContextMenu = (e: ContextMenuEvent, friend: Friend) => {
    e.preventDefault();
    console.log("friend context menu");
    const contextMenuLocation = { x: e.pageX, y: e.pageY };
    dispatch(setContextMenuLocation(contextMenuLocation));
    dispatch(setShowContextMenu(true));
    dispatch(setSelectedFriend(friend));
  };

  useEffect(() => {
    const handleClick = () => dispatch(setShowContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [dispatch]);

  const handleResize = useCallback(
    (e: UIEvent) => dispatch(setShowContextMenu(false)),
    [dispatch]
  );
  useResize(handleResize);

  return (
    <FriendListContainer>
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={handleContextMenu}
        />
      ))}
      {offlineFriends.length > 0 && (
        <span>Offline ({offlineFriends.length})</span>
      )}
      {offlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={handleContextMenu}
        />
      ))}
      {showContextMenu && <FriendContextMenu />}
    </FriendListContainer>
  );
};

export default FriendList;
