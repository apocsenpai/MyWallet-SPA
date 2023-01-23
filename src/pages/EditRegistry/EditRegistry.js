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

const EditRegistry = () => {
  const { token } = useAuth();
  const { registryId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editRegistryForm, setEditRegistryForm] = useState({
    amount: "",
    description: "",
  });
  const [entryOrOutflow, setEntryOrOutflow] = useState(null);
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
        const { amount, description, isEntry } = data;
        setEditRegistryForm({ amount, description, isEntry });
        setEntryOrOutflow(isEntry ? "entrada" : "saída");
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
  const handleEditRegistryForm = useCallback(
    (e) => {
      setEditRegistryForm({
        ...editRegistryForm,
        [e.target.name]: e.target.value,
      });
    },
    [editRegistryForm]
  );
  const handleCashOutflow = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(!isLoading);
      const url = `${API_URL}/cashflow/${registryId}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.put(
          url,
          {
            ...editRegistryForm,
            amount: Number(editRegistryForm.amount.replace(",", ".")).toFixed(
              2
            ),
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
    [token, editRegistryForm, isLoading, registryId, navigate]
  );
  return (
    <RegisterContainer>
      <p>Editar {entryOrOutflow}</p>
      <DataForm onSubmit={handleCashOutflow}>
        <DataInput
          placeholder="Valor"
          type={`number`}
          min="0"
          step=".01"
          name="amount"
          lang="pt-BR"
          onChange={handleEditRegistryForm}
          value={editRegistryForm.amount}
          disabled={isLoading}
          required
        />
        <DataInput
          placeholder="Descrição"
          type={`text`}
          onChange={handleEditRegistryForm}
          name="description"
          minLength={5}
          maxLength={18}
          value={editRegistryForm.description}
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
            `Atualizar ${entryOrOutflow}`
          )}
        </SubmitButton>
      </DataForm>
      {errorMessage && <Alert description={errorMessage} />}
    </RegisterContainer>
  );
};
export default EditRegistry;
