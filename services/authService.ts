import axios from "axios";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const params = new URLSearchParams();
      params.append("username", credentials.username);
      params.append("password", credentials.password);

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

  async me(token: string): Promise<User> {
    try {
      const response = await axios.get<User>(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener usuario");
    }
  },
};
