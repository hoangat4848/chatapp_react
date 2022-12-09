import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import {
  addConversation,
  createConversationThunk,
} from "../../store/slices/conversationSlice";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../utils/styles";
import { ConversationType, CreateConversationParams } from "../../utils/types";
import styles from "./index.module.scss";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: ConversationType;
};

const CreateConversationForm = ({ setShowModal, type }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: CreateConversationParams) => {
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "group") {
      console.log(e.target.value);
    }
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="email">Recipient</InputLabel>
        <InputField
          id="email"
          // {...register("email", { required: "Email is required" })}
          onChange={onChange}
        />
      </InputContainer>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="message">Message (optional)</InputLabel>
          <TextField
            id="message"
            {...register("message", { required: "Message is required" })}
          />
        </InputContainer>
      </section>

      <Button>Create Conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
