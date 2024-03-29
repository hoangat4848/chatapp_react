import { formatRelative } from "date-fns";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { getImageUrl, getRecipientFromConversation } from "../../utils/helpers";
import {
  ConversationSidebarItemDetails,
  StyledConversationSidebarItem,
} from "../../utils/styles";
import { Conversation } from "../../utils/types";
import styles from "./index.module.scss";
import defaultAvatar from "../../__assets__/default-avatar.png";

type Props = {
  conversation: Conversation;
};
const ConversationSidebarItem = ({ conversation }: Props) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(user, conversation);
  const content = conversation.lastMessageSent?.content ?? null;
  const displayContent =
    content && content.length > 10 ? content.substring(0, 20) + "..." : content;

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/conversations/${conversation.id}`)}
      selected={parseInt(id!) === conversation.id}
    >
      <img
        className={styles.conversationAvatar}
        src={
          recipient?.profile?.avatar
            ? getImageUrl(recipient.profile.avatar)
            : defaultAvatar
        }
        alt={`${recipient?.firstName} ${recipient?.lastName} avatar`}
      />
      <ConversationSidebarItemDetails>
        <span className="conversationName">
          {`${recipient?.firstName} ${recipient?.lastName}`}
        </span>
        <span className="conversationLastMessage">{displayContent}</span>
        <span className={styles.conversationLastMessageSentTime}>
          {formatRelative(new Date(conversation.lastMessageSentAt), new Date())}
        </span>
      </ConversationSidebarItemDetails>
    </StyledConversationSidebarItem>
  );
};

export default ConversationSidebarItem;
