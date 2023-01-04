import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { removeAttachment } from "../../../store/message-panel/messagePanelSlice";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  StyledMessageAttachment,
  StyledMessageAttachmentContainer,
} from "../../../utils/styles";
import { Attachment } from "../../../utils/types";
import MessageItemCanvas from "./MessageItemCanvas";

const MessageAttachmentContainer = () => {
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteAttachment = (attachment: Attachment) => {
    dispatch(removeAttachment(attachment));
  };

  return (
    <StyledMessageAttachmentContainer>
      {attachments.map((attachment) => (
        <StyledMessageAttachment
          key={attachment.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <MessageItemCanvas file={attachment.file} />
          <RiDeleteBin6Fill
            color="red"
            style={{ position: "absolute", zIndex: 1, right: 15, top: 10 }}
            size={30}
            onClick={() => handleDeleteAttachment(attachment)}
          />
        </StyledMessageAttachment>
      ))}
    </StyledMessageAttachmentContainer>
  );
};

export default MessageAttachmentContainer;
