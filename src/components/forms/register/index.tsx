import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { postRegisterUser } from "../../../utils/api";
import { CreateUserParams } from "../../../utils/types";
import NameField from "./NameField";
import PasswordField from "./PasswordField";
import UsernameField from "./UsernameField";
import styles from "../index.module.scss";
import { Button } from "../../../utils/styles";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>({ reValidateMode: "onChange" });
  const navigate = useNavigate();

  const { success, error } = useToast();

  const onSubmit = async (data: CreateUserParams) => {
    try {
      await postRegisterUser(data);
      navigate("/login");
      success("Accound created!");
    } catch (err) {
      error("Error creating user");
    }
  };

  const formFieldProps = { errors, register };
  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UsernameField {...formFieldProps} />
      <NameField {...formFieldProps} />
      <PasswordField {...formFieldProps} />
      <Button className={styles.button}>Create My Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
