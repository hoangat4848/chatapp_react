import { PropsWithChildren } from "react";
import {
  StyledModalContainer,
  StyledModalContentBody,
  StyledModalHeader,
} from "../../utils/styles";

export const ModalHeader = ({ children }: PropsWithChildren) => {
  return <StyledModalHeader>{children}</StyledModalHeader>;
};

export const ModalContentBody = ({ children }: PropsWithChildren) => {
  return <StyledModalContentBody>{children}</StyledModalContentBody>;
};

type ModalContainerProps = {
  showModal?: boolean;
};

export const ModalContainer = ({
  children,
  showModal,
}: PropsWithChildren<ModalContainerProps>) => {
  return (
    <StyledModalContainer showModal={showModal}>
      {children}
    </StyledModalContainer>
  );
};
