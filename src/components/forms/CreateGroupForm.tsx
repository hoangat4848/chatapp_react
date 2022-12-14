import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { AppDispatch } from "../../store";
import { createGroupThunk } from "../../store/slices/groupSlice";
import { searchUsers } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  RecipientChipContainer,
  TextField,
} from "../../utils/styles";
import { User } from "../../utils/types";
import GroupRecipientField from "../recipients/GroupRecipientsField";
import RecipientResultContainer from "../recipients/RecipientResultContainer";
import SelectedRecipientChip from "../recipients/SelectedRecipientChip";
import styles from "./index.module.scss";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupForm = ({ setShowModal }: Props) => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    if (!debouncedQuery) {
      return setUserResults([]);
    }
    searchUsers(debouncedQuery)
      .then(({ data }) => setUserResults(data))
      .catch((err) => console.log(err));
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedUsers.length === 0 || !message || !title) return;

    const users = selectedUsers.map((user) => user.email);
    const payload = {
      users,
      title,
    };
    return dispatch(createGroupThunk(payload))
      .unwrap()
      .then(({ data }) => {
        navigate(`/groups/${data.id}`);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserSelect = (user: User) => {
    const exists = selectedUsers.find((u) => u.id === user.id);
    if (!exists) setSelectedUsers((prev) => [...prev, user]);
  };

  const handleUserChipClose = (user: User) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <RecipientChipContainer>
        {selectedUsers.map((user) => (
          <SelectedRecipientChip
            key={user.id}
            user={user}
            onChipClose={handleUserChipClose}
          />
        ))}
      </RecipientChipContainer>

      <GroupRecipientField
        query={query}
        setQuery={setQuery}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      {userResults.length > 0 && query && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
        />
      )}

      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="title">Title</InputLabel>
          <InputField
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
      </section>

      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel htmlFor="message">Message (optional)</InputLabel>
          <TextField
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer>
      </section>

      <Button>Create Group</Button>
    </form>
  );
};

export default CreateGroupForm;
