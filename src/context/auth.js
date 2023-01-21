import React, { useEffect, useMemo, useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const tokenValue = useMemo(() => ({ token, setToken }), [token]);
  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      setToken(JSON.parse(tokenStorage));
    } else {
      setToken("");
    }
  }, []);

  return (
    <AuthContext.Provider value={tokenValue}>{children}</AuthContext.Provider>
  );
};
