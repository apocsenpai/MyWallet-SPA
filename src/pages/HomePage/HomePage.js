import { IoExitOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {
  HomeContainer,
  HomeHeader,
  LogContainer,
  ButtonGroup,
  RegisterButton,
  CashFlowContainer,
  BalanceContainer,
  TotalBalance,
} from "./styled";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import CashFlowCard from "./CashFlowCard/CashFlowCard";
import API_URL from "../../api/API_URL";
import axios from "axios";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import Alert from "../../components/Alert/Alert";

const HomePage = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();
  const [cashFlow, setCashFlow] = useState(null);
  const [userName, setUserName] = useState("");
  const [isNegative, setIsNegative] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);
  useEffect(() => {
    if (!token) navigate("/");
    const fetchData = async () => {
      const url = `${API_URL}/cashflow`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(url, config);
        setCashFlow(data.cashFlow.length ? data.cashFlow : null);
        setUserName(data.name);
      } catch (error) {
        const { message } = error.response.data;
        alert(message);
      }
    };
    fetchData();
  }, [token, navigate, deleteFlag]);
  useEffect(() => {
    let total = 0;
    if (cashFlow) {
      cashFlow.forEach((c) => {
        if (c.isEntry === true) {
          total += Number(c.amount);
        } else {
          total -= Number(c.amount);
        }
      });
      setIsNegative(total < 0 ? true : false);
      setBalance(Math.abs(total).toFixed(2).replace(".", ","));
    }
  }, [cashFlow]);
  const handleLogout = useCallback(async () => {
    const url = `${API_URL}/logout`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(url, config);
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    } catch (error) {
      const { message } = error.response.data;
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      alert();
    }
  }, [token, setToken, navigate]);
  return (
    <HomeContainer>
      <HomeHeader>
        <p>Olá, {userName}</p>
        <button onClick={() => setIsLogout(true)}>
          <IoExitOutline />
        </button>
      </HomeHeader>
      <LogContainer isExistCashFlow={cashFlow !== null}>
        {cashFlow ? (
          <>
            <CashFlowContainer>
              {cashFlow.map(({ _id, date, isEntry, amount, description }) => (
                <CashFlowCard
                  key={_id}
                  id={_id}
                  date={date}
                  isEntry={isEntry}
                  amount={amount}
                  description={description}
                  setDeleteFlag = {setDeleteFlag}
                  deleteFlag = {deleteFlag}
                />
              ))}
            </CashFlowContainer>
            <BalanceContainer>
              <span>SALDO</span>
              <TotalBalance isNegative={isNegative}>{balance}</TotalBalance>
            </BalanceContainer>
          </>
        ) : (
          <span>Não há registros de entrada ou saída</span>
        )}
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
      {isLogout && (
        <ConfirmAlert
          setShowWindow={setIsLogout}
          title={"Deseja mesmo sair?"}
          callback={handleLogout}
        />
      )}
      {errorMessage && <Alert description={errorMessage} />}
    </HomeContainer>
  );
};

export default HomePage;
