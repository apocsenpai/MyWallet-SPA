import styled from "styled-components";
import {
  disabledGrey,
  entryColor,
  mainColor,
  outflowColor,
  textColor,
} from "../../constants/colors/colors";
import { SubmitButton } from "../../styles/styles";
export const HomeContainer = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  min-height: 100vh;
  background-color: ${mainColor};
`;
export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  & > p {
    font-family: "Raleway", sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${textColor};
  }
  & > button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    color: ${textColor};
  }
`;
export const LogContainer = styled.main`
  height: 27.8rem;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isExistCashFlow }) =>
    isExistCashFlow ? "space-between" : "center"};
  align-items: center;
  padding: 1.25rem 0.8rem;
  background-color: ${textColor};
  border: 0.16rem solid transparent;
  border-radius: 0.4rem;
  margin-bottom: 0.8rem;
  & > span {
    font-family: "Raleway", sans-serif;
    font-size: 1.25rem;
    color: ${disabledGrey};
    text-align: center;
  }
`;
export const ButtonGroup = styled.footer`
  height: 7.125rem;
  display: flex;
  gap: 0.8rem;
`;
export const RegisterButton = styled(SubmitButton)`
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  display: block;
  & > a {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    color: ${textColor};
    text-decoration: none;
    & > p {
      width: 2rem;
      text-align: left;
      font-size: 1rem;
    }
  }
`;
export const CashFlowContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 90%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const BalanceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;
  & > span:nth-child(1) {
    font-weight: 700;
  }
`;
export const TotalBalance = styled.span`
  color: ${({ isNegative }) =>
    isNegative ? `${outflowColor}` : `${entryColor}`};
`;
