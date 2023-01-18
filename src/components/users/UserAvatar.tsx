import { UserAvatarContainer } from "../../utils/styles";
import { User } from "../../utils/types";
import defaultAvatar from "../../__assets__/default-avatar.png";

type Props = {
  user: User;
};
const UserAvatar = ({ user }: Props) => {
  const getProfilePicture = () => {
    const { profile } = user;
    return profile?.avatar ?? defaultAvatar;
  };

  return <UserAvatarContainer src={getProfilePicture()} alt="avatar" />;
};

export default UserAvatar;
