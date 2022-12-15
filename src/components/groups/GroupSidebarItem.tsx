import { useNavigate } from "react-router-dom";
import { StyledConversationSidebarItem } from "../../utils/styles";
import { Group } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  group: Group;
};
const GroupSidebarItem = ({ group }: Props) => {
  const navigate = useNavigate();
  const content = group.lastMessageSent?.content;
  const displayContent =
    content && content.length > 10 ? content.substring(0, 20) + "..." : content;

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>
          {group.title ?? "Group"}
        </span>
        <span className={styles.conversationLastMessage}>{displayContent}</span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default GroupSidebarItem;
