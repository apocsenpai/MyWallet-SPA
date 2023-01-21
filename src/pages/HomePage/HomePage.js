import { IoExitOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {
  HomeContainer,
  HomeHeader,
  LogContainer,
  ButtonGroup,
  RegisterButton,
} from "./styled";
import { useCallback, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
const HomePage = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }, [setToken, navigate]);
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
          <Link to="/nova-entrada">
            <AiOutlinePlusCircle />
            <p>Nova entrada</p>
          </Link>
        </RegisterButton>
        <RegisterButton>
          <Link to="/nova-saida">
            <AiOutlineMinusCircle />
            <p>Nova saída</p>
          </Link>
        </RegisterButton>
      </ButtonGroup>
    </HomeContainer>
  );
};

export default HomePage;
