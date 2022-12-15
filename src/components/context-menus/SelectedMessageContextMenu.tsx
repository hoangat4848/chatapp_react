import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { deleteGroupMessageThunk } from "../../store/slices/groupMessageSlice";
import {
  setIsEditingMessage,
  setMessageBeingEdited,
} from "../../store/slices/messageContainerSlice";
import { deleteMessageThunk } from "../../store/slices/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { ContextMenu } from "../../utils/styles";

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
      <ul>
        {selectedMessage?.author.id === user?.id && (
          <li onClick={handleDeleteClick}>Delete</li>
        )}
        {selectedMessage?.author.id === user?.id && (
          <li onClick={handleEditClick}>Edit</li>
        )}
      </ul>
    </ContextMenu>
  );
};

export default SelectedMessageContextMenu;
