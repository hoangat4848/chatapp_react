import styled from "styled-components";

export const DARK = "131313";

export const InputContainer = styled.div`
  width: 100%;
  padding: 14px 16px;

  border-radius: 10px;

  background-color: #131313;
`;

export const InputField = styled.input`
  display: block;

  width: 100%;
  padding: 0;

  outline: none;
  border: none;

  background-color: inherit;
  color: #fff;

  font-size: 18px;
  font-family: "Inter";
`;

export const InputLabel = styled.label`
  display: block;

  margin: 4px 0;

  color: #afafaf;

  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 20px;

  outline: none;
  border: none;
  border-radius: 10px;

  color: #fff;
  background-color: #2b09ff;

  font-size: 25px;
  font-family: "Inter";

  cursor: pointer;
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  background-color: #1a1a1a;
`;
