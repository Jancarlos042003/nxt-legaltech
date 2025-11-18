"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
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
  const router = useRouter();

  // Cargar usuario al iniciar
  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Si hay token, verificamos validez pidiendo el perfil al backend
        const userData = await authService.me();
        setUser(userData);
      } catch (error) {
        console.error("Token inválido o expirado");
        Cookies.remove("token"); // Limpieza si el token no sirve
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);

      // Guardar token en cookie
      Cookies.set("token", response.token, {
        expires: 7, // 7 días
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });

      // Actualizar estado
      setUser(response.user);

      // Redirigir y refrescar para que el middleware detecte la cookie nueva
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Borrar cookie
    Cookies.remove("token");

    // Limpiar estado
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
