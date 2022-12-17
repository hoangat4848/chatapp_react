import { useNavigate, useParams } from "react-router-dom";
import { StyledConversationSidebarItem } from "../../utils/styles";
import { ContextMenuEvent, Group } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  group: Group;
  onContextMenu: (event: ContextMenuEvent, group: Group) => void;
};
const GroupSidebarItem = ({ group, onContextMenu }: Props) => {
  const MAX_TITLE_LENGTH = 20;
  const MAX_MESSAGE_LENGTH = 20;
  const navigate = useNavigate();
  const { id } = useParams();

  const content = group.lastMessageSent?.content;
  const displayGroupLastMessageSent =
    content && content.length > MAX_MESSAGE_LENGTH
      ? content.substring(0, MAX_MESSAGE_LENGTH).concat("...")
      : content;

  const getTransformedTitle = () => {
    const groupTitle = group.title;
    if (!groupTitle) {
      const usersToString = group.users
        .map((user) => user.firstName)
        .join(", ");
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.substring(0, MAX_TITLE_LENGTH).concat("...")
        : usersToString;
    }

    return groupTitle.length > MAX_TITLE_LENGTH
      ? groupTitle.substring(0, MAX_TITLE_LENGTH).concat("...")
      : groupTitle;
  };

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/groups/${group.id}`)}
      onContextMenu={(e) => onContextMenu(e, group)}
      selected={parseInt(id!) === group.id}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>{getTransformedTitle()}</span>
        <span className={styles.conversationLastMessage}>
          {displayGroupLastMessageSent}
        </span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default GroupSidebarItem;
