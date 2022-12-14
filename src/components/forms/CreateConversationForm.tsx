import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/slices/conversationSlice";
import { searchUsers } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputLabel,
  TextField,
} from "../../utils/styles";
import { CreateConversationParams, User } from "../../utils/types";
import RecipientField from "../recipients/RecipientField";
import RecipientResultContainer from "../recipients/RecipientResultContainer";
import styles from "./index.module.scss";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateConversationForm = ({ setShowModal }: Props) => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser || !message) return;

    const data: CreateConversationParams = {
      email: selectedUser.email,
      message,
    };
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
      return setUserResults([]);
    }
    searchUsers(debouncedQuery)
      .then(({ data }) => setUserResults(data))
      .catch((err) => console.log(err));
  }, [debouncedQuery]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setQuery("");
    setUserResults([]);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <RecipientField
        query={query}
        setQuery={setQuery}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {!selectedUser && userResults.length > 0 && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
        />
      )}
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="message">Message (optional)</InputLabel>
          <TextField
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer>
      </section>

      <Button>Create Conversation</Button>
    </form>
  );
};

export default CreateConversationForm;
