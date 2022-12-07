import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  editMessageBeingEditedContent,
  setIsEditingMessage,
} from "../../store/slices/messageContainerSlice";
import { editMessageThunk } from "../../store/slices/messageSlice";
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from "../../utils/styles";
import { EditMessagePayload } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditMessageContainer = ({ onEditMessageChange }: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  if (!messageBeingEdited) {
    console.log("messageBeingEdited is undefined!!!");
    return null;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: EditMessagePayload = {
      conversationId: parseInt(id!),
      messageId: messageBeingEdited.id,
      content: messageBeingEdited.content,
    };

    dispatch(editMessageThunk(params)).finally(() => {
      dispatch(setIsEditingMessage(false));
    });
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
