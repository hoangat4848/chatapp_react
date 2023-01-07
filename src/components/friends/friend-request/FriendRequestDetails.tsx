import { FriendRequestDetail } from "../../../utils/types";
import UserAvatar from "../../users/UserAvatar";

type Props = {
  details: FriendRequestDetail;
};
const FriendRequestDetails = ({ details }: Props) => {
  return (
    <div className="details">
      <UserAvatar user={details.user} />
      <div className="name">
        <span>{details.displayName}</span>
        <span className="status">{details.status}</span>
      </div>
    </div>
  );
};

export default FriendRequestDetails;
