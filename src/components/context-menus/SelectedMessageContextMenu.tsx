import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { deleteMessageThunk } from "../../store/slices/messageSlice";
import { AuthContext } from "../../utils/context/AuthContext";
import { MessageMenuContext } from "../../utils/context/MessageMenuContext";
import { ContextMenu } from "../../utils/styles";

type Props = {
  point: { x: number; y: number };
};
const SelectedMessageContextMenu = ({ point }: Props) => {
  const { message } = useContext(MessageMenuContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const deleteMessage = () => {
    const conversationId = parseInt(id!);
    if (!message) return;
    dispatch(deleteMessageThunk({ conversationId, messageId: message.id }));
  };

  return (
    <ContextMenu top={point.y} left={point.x}>
      <ul>
        {message?.author.id === user?.id && (
          <li onClick={deleteMessage}>Delete</li>
        )}
        {message?.author.id === user?.id && <li>Edit</li>}

        <li>Placeholder</li>
      </ul>
    </ContextMenu>
  );
};

export default SelectedMessageContextMenu;
