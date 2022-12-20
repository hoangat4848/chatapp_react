import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { getFriendEmailFromFriend } from "../../utils/helpers";
import { FriendListItemContainer } from "../../utils/styles/friends";
import { Friend } from "../../utils/types";

type Props = {
  friend: Friend;
};

const FriendListItem = ({ friend }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendListItemContainer>
      <div className="avatar"></div>
      <div>{getFriendEmailFromFriend(friend, user?.id)}</div>
    </FriendListItemContainer>
  );
};

export default FriendListItem;
