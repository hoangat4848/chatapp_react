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
  const [email, setEmail] = useState("");
  const { id: groupId } = useParams();
  const { success, error } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGroupRecipient({
      groupId: parseInt(groupId!),
      email,
    })
      .then(({ data }) => {
        console.log(data);
        success("Recipient added to the group");
        setEmail("");
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
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <Button
        style={{
          margin: "10px 0",
        }}
        disabled={!email}
      >
        Add Recipient
      </Button>
    </form>
  );
};

export default AddGroupRecipientForm;
