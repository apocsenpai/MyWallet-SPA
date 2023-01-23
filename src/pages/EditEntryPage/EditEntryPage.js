import {
  DataForm,
  DataInput,
  SubmitButton,
  RegisterContainer,
} from "../../styles/styles";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../api/API_URL";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { textColor } from "../../constants/colors/colors";
import Alert from "../../components/Alert/Alert";

const EditEntryPage = () => {
  const { token } = useAuth();
  const { registryId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editEntryForm, setEditEntryForm] = useState({
    amount: "",
    description: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      if (!token) navigate("/");
      const url = `${API_URL}/cashflow/${registryId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(url, config);
        setEditEntryForm(data);
      } catch (error) {
        const { message } = error.response.data;
        setErrorMessage(message);
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      }
    };
    fetchData();
  }, [token, navigate, registryId]);
  const handleEditEntryForm = useCallback(
    (e) => {
      setEditEntryForm({ ...editEntryForm, [e.target.name]: e.target.value });
    },
    [editEntryForm]
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
        await axios.put(
          url,
          {
            ...editEntryForm,
            amount: Number(editEntryForm.amount.replace(",", ".")).toFixed(2),
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
    [token, editEntryForm, isLoading, navigate]
  );
  return (
    <RegisterContainer>
      <p>Editar saída</p>
      <DataForm onSubmit={handleCashOutflow}>
        <DataInput
          placeholder="Valor"
          type={`number`}
          min="0"
          step=".01"
          name="amount"
          lang="pt-BR"
          onChange={handleEditEntryForm}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleEditEntryForm}
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
export default EditEntryPage;
