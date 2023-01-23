import styled from "styled-components";
import { mainColor, textColor } from "../../constants/colors/colors";
import { ButtonGroup } from "../../pages/HomePage/styled";
import { SubmitButton } from "../../styles/styles";

export const ConfirmContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #00000043;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmContent = styled.div`
  width: 90%;
  border-radius: 1.2rem;
  height: 12rem;
  background-color: ${mainColor};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  &>h1{
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    font-size: 1.5rem;
    color: ${textColor};
    text-align: center;
  }
`;
export const ConfirmButtonGroup = styled(ButtonGroup)`
    height: fit-content;
`;
export const ConfirmButton = styled(SubmitButton)`
    width: 5rem;
`;