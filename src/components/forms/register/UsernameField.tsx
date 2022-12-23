import { AxiosError } from "axios";
import { checkUsernameExists } from "../../../utils/api";
import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from "../../../utils/styles";
import { RegisterFormFieldProps } from "../../../utils/types/form";

const UsernameField = ({ register, errors }: RegisterFormFieldProps) => {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="username">Username</InputLabel>
        {errors.username && <InputError>{errors.username.message}</InputError>}
      </InputContainerHeader>
      <InputField
        type="username"
        id="username"
        {...register("username", {
          required: "Username is Required",
          minLength: {
            value: 3,
            message: "Must be at least 3 characters",
          },
          maxLength: {
            value: 16,
            message: "Exceeds 16 characters",
          },
          validate: {
            checkUsername: async (username: string) => {
              try {
                await checkUsernameExists(username);
              } catch (err) {
                console.log("checkusername");
                return (
                  (err as AxiosError).response?.status === 409 &&
                  "Username already exists"
                );
              }
            },
          },
        })}
      />
    </InputContainer>
  );
};

export default UsernameField;
