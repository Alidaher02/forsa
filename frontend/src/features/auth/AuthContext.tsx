import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContextValue";
import { login as loginRequest } from "../../api/authApi";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("accessToken")),
  );

  async function login(email: string, password: string) {
    const response = await loginRequest({ email, password });

    localStorage.setItem("accessToken", response.token);

    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
