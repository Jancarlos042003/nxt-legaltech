"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/services/authService";
import { User } from "@/types/user";
import { LoginRequest } from "@/types/auth";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario automáticamente si la cookie HttpOnly existe
  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await authService.me(); // El backend lee la cookie
        setUser(userData);
      } catch {
        setUser(null); // No hay cookie o está inválida
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login sin manipular tokens (cookie se setea en el backend)
  const login = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setUser(response.user); // El backend ya envió la cookie
  };

  // ✅ Logout: backend borra la cookie con Set-Cookie
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
