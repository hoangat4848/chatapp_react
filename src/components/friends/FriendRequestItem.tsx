import { useContext } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  FriendListItemContainer,
  FriendRequestItemContainer,
  FriendRequestItemIcon,
} from "../../utils/styles/friends";
import { FriendRequest } from "../../utils/types";

type Props = {
  friendRequest: FriendRequest;
};

const FriendRequestItem = ({ friendRequest }: Props) => {
  const { user } = useContext(AuthContext);
  const ICON_SIZE = 24;
  const isIncomingRequest = () => user?.id === friendRequest.receiver.id;

  return (
    <FriendRequestItemContainer>
      <div className="user">
        <div className="avatar"></div>
        <div className="name">
          <span>{`${friendRequest.receiver.firstName} ${friendRequest.receiver.lastName}`}</span>
          {isIncomingRequest() ? (
            <span className="status">Incoming Friend Request</span>
          ) : (
            <span className="status">Outgoing Friend Request</span>
          )}
        </div>
      </div>
      <div className="icons">
        {isIncomingRequest() && (
          <FriendRequestItemIcon isAccept>
            <MdCheck size={ICON_SIZE} />
          </FriendRequestItemIcon>
        )}
        <FriendRequestItemIcon>
          <MdClose size={ICON_SIZE} />
        </FriendRequestItemIcon>
      </div>
    </FriendRequestItemContainer>
  );
};

export default FriendRequestItem;
