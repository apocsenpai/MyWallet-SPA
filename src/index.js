import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/auth";
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(document.querySelector(".root"));

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
