// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};


