import { useContext } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk,
} from "../../store/friends/friendThunk";
import { AuthContext } from "../../utils/context/AuthContext";
import { getFriendRequestDetails } from "../../utils/helpers";
import { FriendRequestItemContainer } from "../../utils/styles/friends";
import { FriendRequest, HandleFriendRequestAction } from "../../utils/types";
import FriendRequestDetails from "./friend-request/FriendRequestDetails";
import FriendRequestIcons from "./friend-request/FriendRequestIcons";

type Props = {
  friendRequest: FriendRequest;
};

const FriendRequestItem = ({ friendRequest }: Props) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const friendRequestDetails = getFriendRequestDetails(friendRequest, user);

  const handleFriendRequest = (type: HandleFriendRequestAction) => {
    const { id } = friendRequest;
    switch (type) {
      case "accept": {
        console.log("accepting friend request");
        return dispatch(acceptFriendRequestThunk(id));
      }
      case "reject": {
        console.log("ahoi");

        return dispatch(rejectFriendRequestThunk(id));
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
      <FriendRequestDetails details={friendRequestDetails} />
      <FriendRequestIcons
        details={friendRequestDetails}
        handleFriendRequest={handleFriendRequest}
      />
    </FriendRequestItemContainer>
  );
};

export default FriendRequestItem;
