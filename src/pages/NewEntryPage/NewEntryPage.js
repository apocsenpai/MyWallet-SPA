import {
  DataForm,
  DataInput,
  SubmitButton,
  RegisterContainer,
} from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api/API_URL";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { textColor } from "../../constants/colors/colors";
import Alert from "../../components/Alert/Alert";
const NewEntryPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [entryForm, setEntryForm] = useState({ amount: "", description: "" });
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);
  const handleEntryForm = useCallback(
    (e) => {
      setEntryForm({ ...entryForm, [e.target.name]: e.target.value });
    },
    [entryForm]
  );
  const handleCashEntry = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(!isLoading);
      const url = `${API_URL}/cashflow`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.post(
          url,
          {
            ...entryForm,
            amount: Number(entryForm.amount.replace(",", ".")).toFixed(2),
            isEntry: true,
          },
          config
        );
        setTimeout(() => {
          navigate("/");
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
    [token, entryForm, isLoading, navigate]
  );
  return (
    <RegisterContainer>
      <p>Nova entrada</p>
      <DataForm onSubmit={handleCashEntry}>
        <DataInput
          placeholder="Valor"
          type={`number`}
          min="0"
          step=".01"
          name="amount"
          lang="pt-BR"
          onChange={handleEntryForm}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleEntryForm}
          name="description"
          minLength={5}
          maxLength={18}
          disabled={isLoading}
          required
        />
        <SubmitButton>
          {isLoading ? (
            <ThreeDots
              height="30"
              width="50"
              color={textColor}
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Salvar entrada"
          )}
        </SubmitButton>
      </DataForm>
      {errorMessage && <Alert description={errorMessage} />}
    </RegisterContainer>
  );
};
export default NewEntryPage;
