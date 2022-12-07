import React, { Dispatch, SetStateAction, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  setIsEditingMessage,
  setMessageBeingEdited,
} from "../../store/slices/messageContainerSlice";
import { deleteMessageThunk } from "../../store/slices/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { ContextMenu } from "../../utils/styles";

type Props = {
  point: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ point }: Props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { isEditingMessage, selectedMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const dispatch = useDispatch<AppDispatch>();

  const deleteMessage = () => {
    const conversationId = parseInt(id!);
    if (!selectedMessage) return;
    dispatch(
      deleteMessageThunk({ conversationId, messageId: selectedMessage.id })
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
          <li onClick={deleteMessage}>Delete</li>
        )}
        {selectedMessage?.author.id === user?.id && (
          <li onClick={handleEditClick}>Edit</li>
        )}
      </ul>
    </ContextMenu>
  );
};

export default SelectedMessageContextMenu;
