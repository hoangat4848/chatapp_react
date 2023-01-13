import { PeopleGroup } from "akar-icons";
import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/helpers";
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
      {group.avatar ? (
        <img
          src={getImageUrl(group.avatar)}
          alt="avatar"
          className={styles.groupAvatar}
        />
      ) : (
        <div className={styles.defaultGroupAvatar}>
          <PeopleGroup size={28} />
        </div>
      )}
      <div>
        <span className="title">{getTransformedTitle()}</span>
        <span className={styles.conversationLastMessage}>
          {displayGroupLastMessageSent}
        </span>
      </div>
    </StyledConversationSidebarItem>
  );
};

export default GroupSidebarItem;
