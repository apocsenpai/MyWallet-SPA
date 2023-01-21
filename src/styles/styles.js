import styled from "styled-components";
import {
  textColor,
  placeholderTextColor,
  mainColor,
  submitButtonColor,
} from "../constants/colors/colors";
export const DataForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;
export const DataInput = styled.input`
  height: 3.6rem;
  padding: 0 0.8rem;
  border-radius: 0.25rem;
  border: 0.16rem solid transparent;
  font-family: "Raleway", sans-serif;
  font-size: 1.25rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${placeholderTextColor};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
export const LogoTitle = styled.h1`
  font-family: "Saira Stencil One", "Arial", sans-serif;
  font-size: 2rem;
  color: ${textColor};
`;
export const RegisterContainer = styled.div`
  background-color: ${mainColor};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem 1.5rem;
  & > p {
    font-family: "Raleway", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    align-self: flex-start;
    color: ${textColor};
  }
`;
export const SignContainer = styled.div`
  background-color: ${mainColor};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
  padding: 0 1.5rem;
  & > a {
    font-weight: 700;
    font-size: 1rem;
    font-family: "Raleway", sans-serif;
    text-decoration: none;
    color: ${textColor};
  }
`;
export const SubmitButton = styled.button`
  height: 2.875rem;
  background-color: ${submitButtonColor};
  color: ${textColor};
  border: 0.16rem solid transparent;
  border-radius: 0.25rem;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  transition: 100ms linear;
  &:hover{
    opacity: 0.8;
  }
`;
