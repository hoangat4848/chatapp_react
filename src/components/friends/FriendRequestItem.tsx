import { useContext } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
} from "../../store/slices/friendSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  FriendListItemContainer,
  FriendRequestItemContainer,
  FriendRequestItemIcon,
} from "../../utils/styles/friends";
import { FriendRequest, HandleFriendRequestAction } from "../../utils/types";

type Props = {
  friendRequest: FriendRequest;
};
const FriendRequestItem = ({ friendRequest }: Props) => {
  const { user } = useContext(AuthContext);
  const ICON_SIZE = 24;
  const dispatch = useDispatch<AppDispatch>();

  const isIncomingRequest = () => user?.id === friendRequest.receiver.id;
  const displayUser = isIncomingRequest()
    ? friendRequest.sender
    : friendRequest.receiver;

  const handleFriendRequest = (type: HandleFriendRequestAction) => {
    console.log(type);
    const id = friendRequest.id;
    switch (type) {
      case "accept": {
        console.log("accepting friend request");
        return dispatch(acceptFriendRequestThunk(id));
      }
      case "reject": {
        return;
      }
      case "cancel": {
        console.log("canceling friend request");
        return dispatch(cancelFriendRequestThunk(id));
      }

      default:
        throw new Error("Invalid action");
    }
  };

  return (
    <FriendRequestItemContainer>
      <div className="user">
        <div className="avatar"></div>
        <div className="name">
          <span>{`${displayUser.firstName} ${displayUser.lastName}`}</span>
          {isIncomingRequest() ? (
            <span className="status">Incoming Friend Request</span>
          ) : (
            <span className="status">Outgoing Friend Request</span>
          )}
        </div>
      </div>
      <div className="icons">
        {isIncomingRequest() && (
          <FriendRequestItemIcon
            isAccept
            onClick={() => handleFriendRequest("accept")}
          >
            <MdCheck size={ICON_SIZE} />
          </FriendRequestItemIcon>
        )}
        <FriendRequestItemIcon
          onClick={() =>
            isIncomingRequest()
              ? handleFriendRequest("reject")
              : handleFriendRequest("cancel")
          }
        >
          <MdClose size={ICON_SIZE} />
        </FriendRequestItemIcon>
      </div>
    </FriendRequestItemContainer>
  );
};

export default FriendRequestItem;
