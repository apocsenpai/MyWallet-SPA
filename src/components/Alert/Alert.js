import { AlertContent } from "./styled";
import { FiAlertCircle } from "react-icons/fi";
const Alert = ({ description }) => {
  return (
    <AlertContent>
      <span>
        <FiAlertCircle />
      </span>
      <p>{description}</p>
    </AlertContent>
  );
};

export default Alert;
