import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../utils/styles";
import { RegisterFormFieldProps } from "../../../utils/types/form";
import styles from "../index.module.scss";

const PasswordField = ({ register, errors }: RegisterFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const ICON_SIZE = 24;

  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </InputContainerHeader>
      <div className={styles.passwordContainer}>
        <InputField
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
            maxLength: {
              value: 20,
              message: "Max characters is 20",
            },
          })}
        />
        {showPassword ? (
          <AiFillEyeInvisible
            size={ICON_SIZE}
            onClick={() => setShowPassword(false)}
            cursor="pointer"
          />
        ) : (
          <AiFillEye
            size={ICON_SIZE}
            onClick={() => setShowPassword(true)}
            cursor="pointer"
          />
        )}
      </div>
    </InputContainer>
  );
};

export default PasswordField;
