import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { editGroupMessageThunk } from "../../store/slices/groupMessageSlice";
import { setIsEditingMessage } from "../../store/slices/messageContainerSlice";
import { editMessageThunk } from "../../store/slices/messageSlice";
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from "../../utils/styles";
import { EditGroupMessagePayload, EditMessagePayload } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
  const { id: routeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const { messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  if (!messageBeingEdited) {
    console.log("messageBeingEdited is undefined!!!");
    return null;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = parseInt(routeId!);
    const messageId = messageBeingEdited.id;
    const content = messageBeingEdited.content;
    if (!content) return;

    if (conversationType === "private") {
      const params: EditMessagePayload = {
        conversationId: id,
        messageId,
        content,
      };

      dispatch(editMessageThunk(params)).finally(() => {
        dispatch(setIsEditingMessage(false));
      });
    } else if (conversationType === "group") {
      const params: EditGroupMessagePayload = {
        groupId: id,
        messageId,
        content,
      };

      dispatch(editGroupMessageThunk(params)).finally(() =>
        dispatch(setIsEditingMessage(false))
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <EditMessageInputField
          value={messageBeingEdited.content}
          onChange={onEditMessageChange}
        />
      </form>
      <EditMessageActionsContainer>
        escape to <span>cancel</span> - enter to <span>save</span>
      </EditMessageActionsContainer>
    </div>
  );
};

export default EditMessageContainer;
