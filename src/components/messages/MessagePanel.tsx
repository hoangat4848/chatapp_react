import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { AppDispatch, RootState } from "../../store";
import { removeAllAttachments } from "../../store/message-panel/messagePanelSlice";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { selectGroupById } from "../../store/slices/groupSlice";
import { selectType } from "../../store/slices/selectedSlice";
import { createMessage, createGroupMessage } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import {
  MessagePanelBody,
  MessageTypingStatus,
  StyledMessagePanel,
} from "../../utils/styles";
import MessageAttachmentContainer from "./attachments/MessageAttachmentContainer";
import MessageContainer from "./MessageContainer";
import MessageInputField from "./MessageInputField";
import MessagePanelHeader from "./MessagePanelHeader";

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};

const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const toastId = "rateLimitToast";
  const { error } = useToast({ theme: "dark" });
  const [content, setContent] = useState("");
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const { id: routeId } = useParams();

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(routeId!))
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(routeId!))
  );

  const selectedType = useSelector(selectType);

  const recipient = getRecipientFromConversation(user, conversation);

  const sendMessage = async () => {
    const trimmedContent = content.trim();
    if (!routeId) return;
    if (!trimmedContent && !attachments.length) return;
    const id = parseInt(routeId);
    const formData = new FormData();
    formData.append("id", routeId);
    trimmedContent && formData.append("content", trimmedContent);
    attachments.forEach((attachments) =>
      formData.append("attachments", attachments.file)
    );
    console.log("asd");
    console.log(trimmedContent);

    try {
      selectedType === "private"
        ? await createMessage(id, formData)
        : await createGroupMessage(id, formData);
      setContent("");
      dispatch(removeAllAttachments());
    } catch (err) {
      console.log(err);

      (err as AxiosError).response?.status === 429 &&
        error("You are rate limited", { toastId });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(removeAllAttachments());
    };
  }, [routeId, dispatch]);

  return (
    <StyledMessagePanel>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer />
        {attachments.length > 0 && <MessageAttachmentContainer />}
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
          sendTypingStatus={sendTypingStatus}
          placeholderName={
            selectedType === "group"
              ? group?.title || "Group"
              : recipient?.firstName || "User"
          }
        />
        <MessageTypingStatus>
          {isRecipientTyping && `${recipient?.firstName} is typing...`}
        </MessageTypingStatus>
      </MessagePanelBody>
    </StyledMessagePanel>
  );
};
export default MessagePanel;
