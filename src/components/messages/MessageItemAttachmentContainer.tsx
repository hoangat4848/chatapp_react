import { getImageUrl } from "../../utils/helpers";
import { GroupMessageType, Message } from "../../utils/types";

type Props = {
  message: Message | GroupMessageType;
};
const MessageItemAttachmentContainer = ({ message }: Props) => {
  return (
    <div>
      {message.attachments?.map((attachment) => (
        <img
          key={attachment.key}
          src={getImageUrl(attachment.key)}
          width={300}
          alt={attachment.key}
        />
      ))}
    </div>
  );
};

export default MessageItemAttachmentContainer;
