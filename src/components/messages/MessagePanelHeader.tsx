import { PeopleGroup, PersonAdd } from "akar-icons";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { selectConversationById } from "../../store/slices/conversationSlice";
import { toggleSidebar } from "../../store/slices/groupRecipientsSidebarSlice";
import { selectGroupById } from "../../store/slices/groupSlice";
import { selectType } from "../../store/slices/selectedSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  getRecipientFullnameFromConversation,
  isGroupOwner,
} from "../../utils/helpers";
import { GroupHeaderIcons, StyledMessagePanelHeader } from "../../utils/styles";
import AddGroupRecipientModal from "../modals/AddGroupRecipientModal";

const MessagePanelHeader = () => {
  const ICONS_SETTINGS = {
    size: 30,
    strokeWith: 2,
    cursor: "pointer",
  };

  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const type = useSelector(selectType);
  const dispatch = useDispatch<AppDispatch>();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  const displayName = getRecipientFullnameFromConversation(user, conversation);

  const groupTitle = group?.title ?? "Group";

  const headerTitle = type === "group" ? groupTitle : displayName;

  // TODO: Add avatar
  return (
    <>
      {showModal && <AddGroupRecipientModal setShowModal={setShowModal} />}
      <StyledMessagePanelHeader>
        <p>{headerTitle}</p>
        <GroupHeaderIcons>
          {type === "group" && isGroupOwner(user, group) && (
            <PersonAdd
              size={ICONS_SETTINGS.size}
              strokeWidth={ICONS_SETTINGS.strokeWith}
              cursor={ICONS_SETTINGS.cursor}
              onClick={() => setShowModal(true)}
            />
          )}
          {type === "group" && (
            <PeopleGroup
              size={ICONS_SETTINGS.size}
              strokeWidth={ICONS_SETTINGS.strokeWith}
              cursor={ICONS_SETTINGS.cursor}
              onClick={() => dispatch(toggleSidebar())}
            />
          )}
        </GroupHeaderIcons>
      </StyledMessagePanelHeader>
    </>
  );
};

export default MessagePanelHeader;
