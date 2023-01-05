import { getImageUrl } from "../../utils/helpers";
import { StyledMessageItemAvatar } from "../../utils/styles";
import { GroupMessageType, Message } from "../../utils/types";
import defaultAvatar from "../../__assets__/default-avatar.png";

type Props = {
  message: Message | GroupMessageType;
};
const MessageItemAvatar = ({ message }: Props) => {
  const getProfilePicture = () => {
    const { profile } = message.author;
    return profile?.avatar ? getImageUrl(profile.avatar) : defaultAvatar;
  };

  return <StyledMessageItemAvatar src={getProfilePicture()} alt="avatar" />;
};

export default MessageItemAvatar;
