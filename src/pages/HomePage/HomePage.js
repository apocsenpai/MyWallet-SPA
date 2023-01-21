import { IoExitOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {
  HomeContainer,
  HomeHeader,
  LogContainer,
  ButtonGroup,
  RegisterButton,
} from "./styled";
import { useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { setToken, token } = useAuth;
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }, []);
  return (
    <HomeContainer>
      <HomeHeader>
        <p>Olá, fulano</p>
        <button onClick={handleLogout}>
          <IoExitOutline />
        </button>
      </HomeHeader>
      <LogContainer>
        <span>Não há registros de entrada ou saída</span>
      </LogContainer>
      <ButtonGroup>
        <RegisterButton>
          <AiOutlinePlusCircle />
          <p>Nova entrada</p>
        </RegisterButton>
        <RegisterButton>
          <AiOutlineMinusCircle />
          <p>Nova saída</p>
        </RegisterButton>
      </ButtonGroup>
    </HomeContainer>
  );
};

export default HomePage;
