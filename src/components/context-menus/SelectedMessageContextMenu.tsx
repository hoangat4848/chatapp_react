import React, { Dispatch, SetStateAction, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { deleteMessageThunk } from "../../store/slices/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { ContextMenu } from "../../utils/styles";

type Props = {
  point: { x: number; y: number };
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};
const SelectedMessageContextMenu = ({ point, setIsEditing }: Props) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { message, editMessage, setEditMessage } =
    useContext(MessageMenuContext);

  const dispatch = useDispatch<AppDispatch>();

  const deleteMessage = () => {
    const conversationId = parseInt(id!);
    if (!message) return;
    dispatch(deleteMessageThunk({ conversationId, messageId: message.id }));
  };

  const handleEditClick = () => {
    console.log("ahoi");
    setIsEditing(true);
    setEditMessage(message);
  };

  return (
    <ContextMenu top={point.y} left={point.x}>
      <ul>
        {message?.author.id === user?.id && (
          <li onClick={deleteMessage}>Delete</li>
        )}
        {message?.author.id === user?.id && (
          <li onClick={handleEditClick}>Edit</li>
        )}
      </ul>
    </ContextMenu>
  );
};

export default SelectedMessageContextMenu;
