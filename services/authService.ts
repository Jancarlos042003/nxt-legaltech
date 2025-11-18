import axios from "axios";
import Cookies from "js-cookie";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Función auxiliar para obtener headers con el token
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);

      // Nota: Login NO necesita headers de autorización
      const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/login`,
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error en login");
    }
  },

  async me(): Promise<User> {
    try {
      // Ahora enviamos el token explícitamente en el Header
      const response = await axios.get<User>(
        `${API_URL}/auth/me`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener usuario");
    }
  },
};
