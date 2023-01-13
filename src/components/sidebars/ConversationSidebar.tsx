import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CreateConversationModal from "../modals/CreateConversationModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import ConversationTab from "../conversations/ConversationSidebarTab";
import ConversationSidebarItem from "../conversations/ConversationSidebarItem";
import GroupSidebarItem from "../groups/GroupSidebarItem";
import {
  ConversationScrollableContainer,
  ConversationSidebarHeader,
  ConversationSidebarSearchbar,
  StyledConversationSidebar,
} from "../../utils/styles";
import { ChatAdd } from "akar-icons";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import CreateGroupModal from "../modals/CreateGroupModal";
import { ContextMenuEvent, Group } from "../../utils/types";
import {
  setSelectedGroup,
  setGroupContextMenuLocation,
  setShowGroupContextMenu,
} from "../../store/slices/groupSlice";
import useResize from "../../hooks/useResize";
import GroupSidebarContextMenu from "../context-menus/GroupSidebarContextMenu";
import { getRecipientFullnameFromConversation } from "../../utils/helpers";
import { AuthContext } from "../../utils/context/AuthContext";

const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState("");
  const { user } = useContext(AuthContext);

  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const groups = useSelector((state: RootState) => state.group.groups);
  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      if (!query) return true;

      return (
        conversation.lastMessageSent?.content?.includes(query) ||
        getRecipientFullnameFromConversation(user, conversation)
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [query, conversations, user]);

  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      if (!query) return true;

      return (
        group.lastMessageSent?.content?.includes(query) ||
        group.title?.toLowerCase().includes(query)
      );
    });
  }, [query, groups]);

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const showGroupContextMenu = useSelector(
    (state: RootState) => state.group.showGroupContextMenu
  );

  const handleGroupContextMenu = (e: ContextMenuEvent, group: Group) => {
    e.preventDefault();
    dispatch(setSelectedGroup(group));
    dispatch(setGroupContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setShowGroupContextMenu(true));
  };

  useEffect(() => {
    const handleClick = () => dispatch(setShowGroupContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [dispatch]);

  const handleResize = useCallback(
    (e: UIEvent) => {
      dispatch(setShowGroupContextMenu(false));
    },
    [dispatch]
  );
  useResize(handleResize);

  return (
    <>
      {showModal && conversationType === "private" && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === "group" && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <StyledConversationSidebar>
        <ConversationSidebarHeader>
          <ConversationSidebarSearchbar
            placeholder="Search for conversation.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {conversationType === "private" ? (
            <ChatAdd
              size={24}
              strokeWidth={2}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <AiOutlineUsergroupAdd
              size={24}
              strokeWidth={2}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          )}
        </ConversationSidebarHeader>
        <ConversationTab />

        <ConversationScrollableContainer>
          <section>
            {conversationType === "private"
              ? filteredConversations.map((conversation) => (
                  <ConversationSidebarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              : filteredGroups.map((group) => (
                  <GroupSidebarItem
                    key={group.id}
                    group={group}
                    onContextMenu={handleGroupContextMenu}
                  />
                ))}
          </section>
          {showGroupContextMenu && <GroupSidebarContextMenu />}
        </ConversationScrollableContainer>
      </StyledConversationSidebar>
    </>
  );
};

export default ConversationSidebar;
