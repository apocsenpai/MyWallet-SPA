import { Date, Amount, Card } from "./styled";
const CashFlowCard = ({ id, date, isEntry, amount, description }) => {
  return (
    <Card>
      <div>
        <Date>{date}</Date>
        <span>{description}</span>
      </div>
      <Amount isEntry={isEntry}>{amount.replace(".", ",")}</Amount>
    </Card>
  );
};
export default CashFlowCard;
