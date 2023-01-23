import styled from "styled-components";
import {
  dateColor,
  disabledGrey,
  entryColor,
  outflowColor,
} from "../../../constants/colors/colors";

export const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  a{
    text-decoration: none;
    color: #000;
  }
  & > div {
    display: flex;
    align-items: center;
  }
`;
export const Date = styled.span`
  color: ${dateColor};
  margin-right: 0.5rem;
`;
export const Amount = styled.span`
  color: ${({ isEntry }) => (isEntry ? `${entryColor}` : `${outflowColor}`)};
`;
export const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${disabledGrey};

`;
