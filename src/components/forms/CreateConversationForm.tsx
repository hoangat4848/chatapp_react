import React, { useRef, useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { AppDispatch } from "../../store";
import {
  addConversation,
  createConversationThunk,
} from "../../store/slices/conversationSlice";
import { searchUsers } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  RecipientResultContainer,
  TextField,
} from "../../utils/styles";
import {
  ConversationType,
  CreateConversationParams,
  User,
} from "../../utils/types";
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

  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [message, setMessage] = useState("");

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

  const debouncedQuery = useDebounce(query, 1000);
  useEffect(() => {
    if (!debouncedQuery) {
      setUserResults([]);
    }
    searchUsers(debouncedQuery)
      .then(({ data }) => setUserResults(data))
      .catch((err) => console.log(err));
  }, [debouncedQuery]);

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="email">Recipient</InputLabel>
          <InputField
            id="email"
            // {...register("email", { required: "Email is required" })}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputContainer>
      </section>
      <RecipientResultContainer></RecipientResultContainer>
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
