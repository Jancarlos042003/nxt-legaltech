"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/authService";
import { tokenService } from "@/services/tokenService";
import { User } from "@/types/user";
import { LoginRequest } from "@/types/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = tokenService.getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.me(token);
        setUser(userData);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        tokenService.clearToken();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    tokenService.setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    tokenService.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
