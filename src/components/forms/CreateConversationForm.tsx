import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/slices/conversationSlice";
import { createGroupThunk } from "../../store/slices/groupSlice";
import { createGroup, searchUsers } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../utils/styles";
import {
  ConversationType,
  CreateConversationParams,
  User,
} from "../../utils/types";
import RecipientField from "../recipients/RecipientField";
import RecipientResultContainer from "../recipients/RecipientResultContainer";
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
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "private") {
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
    }

    if (type === "group") {
      if (selectedUsers.length === 0) return;
      const userEmails = selectedUsers.map((user) => user.email);

      return dispatch(createGroupThunk(userEmails))
        .unwrap()
        .then(({ data }) => {
          setShowModal(false);
          navigate(`/groups/${data.id}`);
        })
        .catch((err) => console.log(err));
    }
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

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setQuery("");
    setUserResults([]);
  };

  const handleMultipleUserSelect = (user: User) => {
    const exists = selectedUsers.find((u) => u.id === user.id);
    if (!exists) setSelectedUsers((prev) => [...prev, user]);
  };

  const removeAllSelectedUsers = () => {
    setQuery("");
    setUserResults([]);
    setSelectedUsers([]);
  };

  const saveResults = () => {
    setQuery("");
    setUserResults([]);
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientField
        query={query}
        setQuery={setQuery}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        type={type}
      />

      {!selectedUser && userResults.length > 0 && (
        <RecipientResultContainer
          userResults={userResults}
          type={type}
          handleUserSelect={handleUserSelect}
          handleMultipleUserSelect={handleMultipleUserSelect}
          removeAllSelectedUsers={removeAllSelectedUsers}
          saveResults={saveResults}
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
