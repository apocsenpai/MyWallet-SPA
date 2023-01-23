import { useCallback } from "react";
import {
  ConfirmContainer,
  ConfirmContent,
  ConfirmButton,
  ConfirmButtonGroup,
} from "./styled";

const ConfirmAlert = ({ setShowWindow, title, callback }) => {
  const closeWindow = useCallback(() => {
    setShowWindow(false);
  }, [setShowWindow]);
  return (
    <ConfirmContainer onClick={closeWindow}>
      <ConfirmContent>
        <h1>{title}</h1>
        <ConfirmButtonGroup>
          <ConfirmButton onClick={closeWindow}>Não ;)</ConfirmButton>
          <ConfirmButton onClick={callback}>Sim :(</ConfirmButton>
        </ConfirmButtonGroup>
      </ConfirmContent>
    </ConfirmContainer>
  );
};

export default ConfirmAlert;
