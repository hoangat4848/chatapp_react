import { MdCheck, MdClose } from "react-icons/md";
import { FriendRequestItemIcon } from "../../../utils/styles/friends";
import {
  FriendRequestDetail,
  HandleFriendRequestAction,
} from "../../../utils/types";

type Props = {
  details: FriendRequestDetail;
  handleFriendRequest: (type: HandleFriendRequestAction) => void;
};
const FriendRequestIcons = ({ details, handleFriendRequest }: Props) => {
  return (
    <div className="icons">
      {details.incoming && (
        <FriendRequestItemIcon
          isAccept
          onClick={() => handleFriendRequest("accept")}
        >
          <MdCheck />
        </FriendRequestItemIcon>
      )}
      <FriendRequestItemIcon
        onClick={() => {
          details.incoming
            ? handleFriendRequest("reject")
            : handleFriendRequest("cancel");
        }}
      >
        <MdClose />
      </FriendRequestItemIcon>
    </div>
  );
};

export default FriendRequestIcons;
