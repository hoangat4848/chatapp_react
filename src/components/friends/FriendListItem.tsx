import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { getFriendUsernameFromFriend } from "../../utils/helpers";
import { FriendListItemContainer } from "../../utils/styles/friends";
import { ContextMenuEvent, Friend } from "../../utils/types";

type Props = {
  friend: Friend;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

const FriendListItem = ({ friend, onContextMenu }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)}>
      <div className="avatar"></div>
      <div>{getFriendUsernameFromFriend(friend, user?.id)}</div>
    </FriendListItemContainer>
  );
};

export default FriendListItem;
