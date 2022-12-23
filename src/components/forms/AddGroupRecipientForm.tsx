import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { addGroupRecipient } from "../../utils/api";
import {
  InputContainer,
  InputLabel,
  InputField,
  Button,
} from "../../utils/styles";
import styles from "./index.module.scss";

const AddGroupRecipientForm = () => {
  const [username, setUsername] = useState("");
  const { id: groupId } = useParams();
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGroupRecipient({
      groupId: parseInt(groupId!),
      username,
    })
      .then(({ data }) => {
        console.log(data);
        success("Recipient added to the group");
        setUsername("");
      })
      .catch((err) => {
        console.log(err);
        error("Failed to add user");
      });
  };

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <Button
        style={{
          margin: "10px 0",
        }}
        disabled={!username}
      >
        Add Recipient
      </Button>
    </form>
  );
};

export default AddGroupRecipientForm;
