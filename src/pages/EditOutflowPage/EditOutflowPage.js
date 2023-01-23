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

const EditOutflowPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [outflowForm, setOutflowForm] = useState({
    amount: "",
    description: "",
  });
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);
  const handleOutflowForm = useCallback(
    (e) => {
      setOutflowForm({ ...outflowForm, [e.target.name]: e.target.value });
    },
    [outflowForm]
  );
  const handleCashOutflow = useCallback(
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
            ...outflowForm,
            amount: Number(outflowForm.amount.replace(",", ".")).toFixed(2),
            isEntry: false,
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
    [token, outflowForm, isLoading, navigate]
  );
  return (
    <RegisterContainer>
      <p>Saída saída</p>
      <DataForm onSubmit={handleCashOutflow}>
        <DataInput
          placeholder="Valor"
          type={`number`}
          min="0"
          step=".01"
          name="amount"
          lang="pt-BR"
          onChange={handleOutflowForm}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleOutflowForm}
          name="description"
          minLength={5}
          maxLength={18}
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
            "Salvar saída"
          )}
        </SubmitButton>
      </DataForm>
      {errorMessage && <Alert description={errorMessage} />}
    </RegisterContainer>
  );
};
export default EditOutflowPage;
