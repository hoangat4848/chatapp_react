import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { deleteGroupMessageThunk } from "../../store/slices/groupMessageSlice";
import {
  setIsEditingMessage,
  setMessageBeingEdited,
} from "../../store/slices/messageContainerSlice";
import { deleteMessageThunk } from "../../store/messages/messageThunk";
import { AuthContext } from "../../utils/context/AuthContext";
import { ContextMenu, ContextMenuItem } from "../../utils/styles";

type Props = {
  point: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ point }: Props) => {
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const { selectedMessage } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteClick = () => {
    const id = parseInt(routeId!);
    if (!selectedMessage) return;

    const messageId = selectedMessage.id;

    if (conversationType === "private")
      dispatch(
        deleteMessageThunk({
          conversationId: id,
          messageId,
        })
      );
    else if (conversationType === "group")
      dispatch(
        deleteGroupMessageThunk({
          groupId: id,
          messageId,
        })
      );
  };

  const handleEditClick = () => {
    if (!selectedMessage) return;
    dispatch(setIsEditingMessage(true));
    dispatch(setMessageBeingEdited(selectedMessage));
  };

  return (
    <ContextMenu top={point.y} left={point.x}>
      {selectedMessage?.author.id === user?.id && (
        <ContextMenuItem onClick={handleDeleteClick}>Delete</ContextMenuItem>
      )}
      {selectedMessage?.author.id === user?.id && (
        <ContextMenuItem onClick={handleEditClick}>Edit</ContextMenuItem>
      )}
    </ContextMenu>
  );
};

export default SelectedMessageContextMenu;
