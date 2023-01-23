import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DataForm,
  DataInput,
  LogoTitle,
  SubmitButton,
  SignContainer,
} from "../../styles/styles";
import API_URL from "../../api/API_URL";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { ThreeDots } from "react-loader-spinner";
import { textColor } from "../../constants/colors/colors";
const SignUpPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);
  const handleRegistrationForm = useCallback(
    (e) => {
      setRegistrationForm({
        ...registrationForm,
        [e.target.name]: e.target.value,
      });
    },
    [registrationForm]
  );
  const handleRegistration = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(!isLoading);
      const url = `${API_URL}/sign-up`;
      try {
        await axios.post(url, registrationForm);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        const { message } = error.response.data;
        alert(message);
        setIsLoading(false);
      }
    },
    [registrationForm, navigate, isLoading]
  );
  return (
    <SignContainer>
      <LogoTitle>MyWallet</LogoTitle>
      <DataForm onSubmit={handleRegistration}>
        <DataInput
          placeholder="Nome"
          type={`text`}
          name="name"
          onChange={handleRegistrationForm}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="E-mail"
          type={`email`}
          name="email"
          onChange={handleRegistrationForm}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="Senha"
          type={`password`}
          name="password"
          onChange={handleRegistrationForm}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="Confirme a senha"
          type={`password`}
          name="confirmedPassword"
          onChange={handleRegistrationForm}
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
            "Cadastrar"
          )}
        </SubmitButton>
      </DataForm>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignContainer>
  );
};
export default SignUpPage;
