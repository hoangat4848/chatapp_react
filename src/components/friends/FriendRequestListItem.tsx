import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { FriendListItemContainer } from "../../utils/styles/friends";
import { FriendRequest } from "../../utils/types";

type Props = {
  friendRequest: FriendRequest;
};

const FriendRequestListItem = ({ friendRequest }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendListItemContainer>
      <div className="avatar"></div>
      <div>
        {user?.id === friendRequest.sender.id ? (
          <div>Outgoing request to {friendRequest.receiver.email}</div>
        ) : (
          <div>Incoming request to {friendRequest.sender.email}</div>
        )}
      </div>
    </FriendListItemContainer>
  );
};

export default FriendRequestListItem;
