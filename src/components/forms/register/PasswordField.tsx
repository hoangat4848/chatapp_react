import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../utils/styles";
import { RegisterFormFieldProps } from "../../../utils/types/form";

const PasswordField = ({ register, errors }: RegisterFormFieldProps) => {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputError>{errors.password?.message}</InputError>
      </InputContainerHeader>
      <InputField
        type="password"
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
    </InputContainer>
  );
};

export default PasswordField;
