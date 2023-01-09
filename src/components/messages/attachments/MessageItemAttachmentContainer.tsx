import { useState } from "react";
import { MdClose } from "react-icons/md";
import useKeydown from "../../../hooks/useKeydown";
import { getImageUrl } from "../../../utils/helpers";
import { StyledOverlay } from "../../../utils/styles";
import { GroupMessageType, Message } from "../../../utils/types";
import styles from "./index.module.scss";

type Props = {
  message: Message | GroupMessageType;
};
const MessageItemAttachmentContainer = ({ message }: Props) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onClick = (key: string) => {
    setShowOverlay(true);
    setImageUrl(getImageUrl(key));
  };

  const handleKeydown = (e: KeyboardEvent) => {
    e.key === "Escape" && setShowOverlay(false);
  };
  useKeydown(handleKeydown);

  return (
    <>
      {showOverlay && (
        <StyledOverlay>
          <MdClose
            className={styles.closeIcon}
            onClick={() => setShowOverlay(false)}
          />
          <img src={imageUrl} alt="overlay" />
        </StyledOverlay>
      )}
      <div>
        {message.attachments?.map((attachment) => (
          <img
            key={attachment.key}
            src={getImageUrl(attachment.key)}
            width={300}
            alt={attachment.key}
            onClick={() => onClick(attachment.key)}
            style={{ cursor: "pointer", maxHeight: "90%" }}
          />
        ))}
      </div>
    </>
  );
};

export default MessageItemAttachmentContainer;
