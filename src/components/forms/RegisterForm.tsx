import React from "react";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
import styles from "./index.module.scss";

const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField id="email" type="email" />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="first-name">First Name</InputLabel>
          <InputField id="first-name" type="text" />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="last-name">Last Name</InputLabel>
          <InputField id="last-name" type="text" />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField id="password" type="password" />
      </InputContainer>

      <Button className={styles.button}>Create my account</Button>
    </form>
  );
};

export default RegisterForm;
