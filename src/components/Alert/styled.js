import styled from "styled-components";
import {
  safetyYellow,
  submitButtonColor,
  textColor,
} from "../../constants/colors/colors";

export const AlertContent = styled.div`
  position: fixed;
  bottom: 2rem;
  width: 90%;
  margin: 0 auto;
  height: 3.5rem;
  border-radius: 0.8rem;
  background-color: ${submitButtonColor};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  & > span {
    color: ${safetyYellow};
    font-size: 1.5rem;
  }
  & > p {
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
    color: ${textColor};
  }
`;
