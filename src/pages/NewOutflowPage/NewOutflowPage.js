import {
  DataForm,
  DataInput,
  SubmitButton,
  RegisterContainer,
} from "../../styles/styles";

const NewOutflowPage = () => {
  return (
    <RegisterContainer>
      <p>Nova saída</p>
      <DataForm>
        <DataInput placeholder="Valor" type={`number`} required />
        <DataInput placeholder="Descrição" type={`text`} required />
        <SubmitButton>Salvar saída</SubmitButton>
      </DataForm>
    </RegisterContainer>
  );
};
export default NewOutflowPage;
