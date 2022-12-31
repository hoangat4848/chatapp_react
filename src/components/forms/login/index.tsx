import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLoginUser } from "../../../utils/api";
import { SocketContext } from "../../../utils/context/SocketContext";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../../utils/styles";
import { UserCredentialsParams } from "../../../utils/types";
import styles from "../index.module.scss";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentialsParams>();

  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      await postLoginUser(data);
      navigate("/conversations");
      socket.connect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="username">Username</InputLabel>
        <InputField
          id="username"
          type="text"
          {...register("username", { required: "Username is required" })}
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an account? </span>
        <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default LoginForm;