import { useNavigate } from "react-router-dom";
import { StyledConversationSidebarItem } from "../../utils/styles";
import { Group } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  group: Group;
};
const GroupSidebarItem = ({ group }: Props) => {
  const navigate = useNavigate();

  return (
    <StyledConversationSidebarItem
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <div className={styles.conversationAvatar}></div>
      <div>
        <span className={styles.conversationName}>
          {group.title ?? "Group"}
        </span>
        <span className={styles.conversationLastMessage}>
          {group.lastMessageSent?.content}
        </span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default GroupSidebarItem;
