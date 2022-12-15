import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegisterUser } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from "../../utils/styles";
import { CreateUserParams } from "../../utils/types";
import styles from "./index.module.scss";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<CreateUserParams>();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserParams) => {
    try {
      await postRegisterUser(data);
      navigate("/login");
      toast("Accound created!", { type: "success", icon: true });
    } catch (error) {
      toast("Error creating user");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
      </InputContainer>

      <Button className={styles.button}>Create my account</Button>

      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
