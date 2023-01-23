import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../api/API_URL";
import Alert from "../../components/Alert/Alert";
import { textColor } from "../../constants/colors/colors";
import useAuth from "../../hooks/useAuth";
import {
  DataForm,
  DataInput,
  LogoTitle,
  SubmitButton,
  SignContainer,
} from "../../styles/styles";
const SignInPage = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);
  const handleLoginForm = useCallback(
    (e) => {
      setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    },
    [loginForm]
  );
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(!isLoading);
      const url = `${API_URL}/sign-in`;
      try {
        const {
          data: { token },
        } = await axios.post(url, loginForm);

        setToken(token);
        localStorage.setItem("token", JSON.stringify(token));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (error) {
        const { message } = error.response.data;
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage("");
          setIsLoading(false);
        }, 1500);
      }
    },
    [loginForm, navigate, isLoading, setToken]
  );
  return (
    <SignContainer>
      <LogoTitle>MyWallet</LogoTitle>
      <DataForm onSubmit={handleLogin}>
        <DataInput
          placeholder="E-mail"
          type={`email`}
          name="email"
          onChange={handleLoginForm}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="Senha"
          type={`password`}
          name="password"
          onChange={handleLoginForm}
          disabled={isLoading}
          required
        />
        <SubmitButton disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              height="30"
              width="50"
              color={textColor}
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Entrar"
          )}
        </SubmitButton>
      </DataForm>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
      {errorMessage && <Alert description={errorMessage} />}
    </SignContainer>
  );
};

export default SignInPage;
