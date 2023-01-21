import {
  DataForm,
  DataInput,
  SubmitButton,
  RegisterContainer,
} from "../../styles/styles";
const NewEntryPage = () => {
  return (
    <RegisterContainer>
      <p>Nova entrada</p>
      <DataForm>
        <DataInput placeholder="Valor" type={`number`} required />
        <DataInput placeholder="Descrição" type={`text`} required />
        <SubmitButton>Salvar entrada</SubmitButton>
      </DataForm>
    </RegisterContainer>
  );
};
export default NewEntryPage;
