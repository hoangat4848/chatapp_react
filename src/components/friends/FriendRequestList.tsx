import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FriendListContainer } from "../../utils/styles/friends";
import FriendRequestListItem from "./FriendRequestListItem";

const FriendRequestList = () => {
  const friendRequests = useSelector(
    (state: RootState) => state.friend.friendRequests
  );

  return (
    <FriendListContainer>
      {friendRequests.length === 0 && <div>No friend requests..</div>}
      {friendRequests.map((friendRequest) => (
        <FriendRequestListItem friendRequest={friendRequest} />
      ))}
    </FriendListContainer>
  );
};

export default FriendRequestList;
