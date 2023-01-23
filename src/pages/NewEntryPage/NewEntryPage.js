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
const NewEntryPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(false);
        const { message } = error.response.data;
        alert(message);
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
          type={`text`}
          pattern="[0-9]+([,\.][0-9]+)?"
          min="0"
          step="any"
          name="amount"
          onChange={handleEntryForm}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleEntryForm}
          name="description"
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
    </RegisterContainer>
  );
};
export default NewEntryPage;
