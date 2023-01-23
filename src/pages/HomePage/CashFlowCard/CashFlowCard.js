import { Date, Amount, Card, DeleteButton } from "./styled";
import { IoCloseOutline } from "react-icons/io5";
import { useCallback, useState } from "react";
import API_URL from "../../../api/API_URL";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import ConfirmAlert from "../../../components/ConfirmAlert/ConfirmAlert";
import Alert from "../../../components/Alert/Alert";
import { Link } from "react-router-dom";

const CashFlowCard = ({
  id,
  date,
  isEntry,
  amount,
  description,
  setDeleteFlag,
  deleteFlag,
}) => {
  const { token } = useAuth();
  const [isDeleteRegistry, setIsDeleteRegistry] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDeleteRegistry = useCallback(async () => {
    const url = `${API_URL}/cashflow/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(url, config);
      setIsDeleteRegistry(false);
      setDeleteFlag(!deleteFlag);
    } catch (error) {
      const { message } = error.response.data;
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }
  }, [id, token, setDeleteFlag, deleteFlag]);
  const showDeleteScreen = useCallback(() => setIsDeleteRegistry(true), []);
  return (
    <Card>
      <div>
        <Date>{date}</Date>
        <Link to={isEntry ? `/editar-entrada/${id}`:`/editar-saida/${id}`}>{description}</Link>
      </div>
      <div>
        <Amount isEntry={isEntry}>{amount.replace(".", ",")}</Amount>
        <DeleteButton onClick={showDeleteScreen}>
          <IoCloseOutline />
        </DeleteButton>
      </div>
      {isDeleteRegistry && (
        <ConfirmAlert
          setShowWindow={setIsDeleteRegistry}
          title={"Deseja mesmo deletar esse registro?"}
          callback={handleDeleteRegistry}
        />
      )}
      {errorMessage && <Alert description={errorMessage} />}
    </Card>
  );
};
export default CashFlowCard;
