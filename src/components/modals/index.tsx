import React, { PropsWithChildren } from "react";
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

export const ModalContainer = ({ children }: PropsWithChildren) => {
  return <StyledModalContainer>{children}</StyledModalContainer>;
};
