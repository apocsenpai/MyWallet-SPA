import styled from "styled-components";
import {
  dateColor,
  entryColor,
  outflowColor,
} from "../../../constants/colors/colors";

export const Card = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  & > div {
    display: flex;
    gap: 0.5rem;
  }
`;
export const Date = styled.span`
  color: ${dateColor};
`;
export const Amount = styled.span`
  color: ${({ isEntry }) => (isEntry ? `${entryColor}` : `${outflowColor}`)};
`;
