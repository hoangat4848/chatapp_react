import { AxiosError } from "axios";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { AppDispatch, RootState } from "../../store";
import { createMessageThunk } from "../../store/messages/messageThunk";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { selectGroupById } from "../../store/slices/groupSlice";
import { selectType } from "../../store/slices/selectedSlice";
import { createMessage, postGroupMessage } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import { getRecipientFromConversation } from "../../utils/helpers";
import {
  MessagePanelBody,
  MessageTypingStatus,
  StyledMessagePanel,
} from "../../utils/styles";
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
    if (!routeId || !trimmedContent) return;
    const id = parseInt(routeId);
    const params = { id, content: trimmedContent };
    try {
      selectedType === "private"
        ? await createMessage(params)
        : await postGroupMessage(params);
      setContent("");
    } catch (err) {
      (err as AxiosError).response?.status === 429 &&
        error("You are rate limited", { toastId });
    }
  };

  return (
    <StyledMessagePanel>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer />
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
