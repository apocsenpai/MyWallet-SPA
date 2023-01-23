import React, { useMemo, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const tokenValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    <AuthContext.Provider value={tokenValue}>{children}</AuthContext.Provider>
  );
};
