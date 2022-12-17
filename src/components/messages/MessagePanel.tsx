import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { selectGroupById } from "../../store/slices/groupSlice";
import { selectType } from "../../store/slices/selectedSlice";
import { postGroupMessage, postNewMessage } from "../../utils/api";
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
  sendTypingStatus: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isRecipientTyping: boolean;
};

const MessagePanel = ({ sendTypingStatus, isRecipientTyping }: Props) => {
  const [content, setContent] = useState("");
  const { id: routeId } = useParams();

  const { user } = useContext(AuthContext);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(routeId!))
  );

  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(routeId!))
  );

  const selectedType = useSelector(selectType);

  const recipient = getRecipientFromConversation(user, conversation);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!routeId || !content) return;
    const id = parseInt(routeId);
    try {
      if (selectedType === "private") {
        await postNewMessage({
          id,
          content,
        });
      }
      if (selectedType === "group") {
        await postGroupMessage({
          id,
          content,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setContent("");
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
