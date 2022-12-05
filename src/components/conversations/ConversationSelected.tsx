import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { updateType } from "../../store/slices/selectedSlice";
import { chatTypes } from "../../utils/constants";
import {
  ConversationSelectedItem,
  StyledConversationSelected,
} from "../../utils/styles";
import { ConversationTypeData } from "../../utils/types";

const ConversationSelected = () => {
  const currentChatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type));
    if (chat.type === "group") navigate("/groups");
    else navigate("/conversations");
  };

  return (
    <StyledConversationSelected>
      {chatTypes.map((chat) => (
        <ConversationSelectedItem
          key={chat.type}
          selected={chat.type === currentChatType}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </ConversationSelectedItem>
      ))}
    </StyledConversationSelected>
  );
};

export default ConversationSelected;
