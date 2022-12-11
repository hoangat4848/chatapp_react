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
  InputField,
  InputLabel,
  RecipientResultContainer,
  RecipientResultItem,
  TextField,
} from "../../utils/styles";
import {
  ConversationType,
  CreateConversationParams,
  User,
} from "../../utils/types";
import SelectedRecipientChip from "../recipients/SelectedRecipientChip";
import styles from "./index.module.scss";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: ConversationType;
};

const CreateConversationForm = ({ setShowModal, type }: Props) => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      setUserResults([]);
    }
    searchUsers(debouncedQuery)
      .then(({ data }) => setUserResults(data))
      .catch((err) => console.log(err));
  }, [debouncedQuery]);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setQuery("");
    setUserResults([]);
  };

  const handleUserSelect = (user: User) => {
    selectUser(user);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="email">Recipient</InputLabel>
          {selectedUser ? (
            <SelectedRecipientChip
              user={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          ) : (
            <InputField
              id="email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          )}
        </InputContainer>
      </section>
      {!selectedUser && userResults.length > 0 && (
        <RecipientResultContainer>
          {userResults.map((user) => (
            <RecipientResultItem onClick={() => handleUserSelect(user)}>
              <span>{user.email}</span>
            </RecipientResultItem>
          ))}
        </RecipientResultContainer>
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
