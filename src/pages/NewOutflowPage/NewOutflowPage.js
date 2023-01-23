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

const NewOutflowPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
        const { message } = error.response.data;
        alert(message);
      }
    },
    [token, outflowForm, isLoading, navigate]
  );
  return (
    <RegisterContainer>
      <p>Nova saída</p>
      <DataForm onSubmit={handleCashOutflow}>
        <DataInput
          placeholder="Valor"
          type={`text`}
          pattern="[0-9]+([,\.][0-9]+)?"
          min="0"
          step="any"
          name="amount"
          onChange={handleOutflowForm}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleOutflowForm}
          name="description"
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
    </RegisterContainer>
  );
};
export default NewOutflowPage;
