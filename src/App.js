import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import HomePage from "./pages/HomePage/HomePage";
import NewEntryPage from "./pages/NewEntryPage/NewEntryPage";
import NewOutflowPage from "./pages/NewOutflowPage/NewOutflowPage";
import EditRegistry from "./pages/EditRegistry/EditRegistry";
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/nova-entrada" element={<NewEntryPage />} />
        <Route path="/nova-saida" element={<NewOutflowPage />} />
        <Route path="/editar-registro/:registryId" element={<EditRegistry/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;
