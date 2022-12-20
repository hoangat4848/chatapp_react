import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FriendListContainer } from "../../utils/styles/friends";
import FriendListItem from "./FriendListItem";

const FriendList = () => {
  const friends = useSelector((state: RootState) => state.friend.friends);

  return (
    <FriendListContainer>
      {friends.map((friend) => (
        <>
          <FriendListItem key={friend.id} friend={friend} />
        </>
      ))}
    </FriendListContainer>
  );
};

export default FriendList;
