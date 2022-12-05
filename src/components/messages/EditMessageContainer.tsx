import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";
import { editMessageThunk } from "../../store/slices/messageSlice";
import {
  EditMessageActionsContainer,
  EditMessageInputField,
} from "../../utils/styles";
import { EditMessagePayload, Message } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  selectedEditMessage: Message;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditMessageContainer = ({
  selectedEditMessage,
  onEditMessageChange,
  setIsEditing,
}: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: EditMessagePayload = {
      conversationId: parseInt(id!),
      messageId: selectedEditMessage.id,
      content: selectedEditMessage.content,
    };

    dispatch(editMessageThunk(params))
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEditing(false);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <EditMessageInputField
          value={selectedEditMessage.content}
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