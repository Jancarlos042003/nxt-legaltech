import axios from "axios";
import Cookies from "js-cookie";
import { Case, CreateCaseRequest, UpdateCaseRequest } from "@/types/case";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Función auxiliar para inyectar el token en los headers
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
};

export const caseService = {
  /**
   * Obtener todos los casos
   */
  getAll: async (): Promise<Case[]> => {
    try {
      const response = await axios.get<Case[]>(
        `${API_URL}/cases`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al cargar los casos");
    }
  },

  /**
   * Obtener un caso por ID
   */
  getById: async (id: string): Promise<Case> => {
    try {
      const response = await axios.get<Case>(
        `${API_URL}/cases/${id}`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener el caso ${id}`);
    }
  },

  /**
   * Crear un nuevo caso
   */
  create: async (data: CreateCaseRequest): Promise<Case> => {
    try {
      const response = await axios.post<Case>(
        `${API_URL}/cases/create`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al crear el caso");
    }
  },

  /**
   * Actualizar un caso existente
   */
  update: async (id: string, data: UpdateCaseRequest): Promise<Case> => {
    try {
      const response = await axios.put<Case>(
        `${API_URL}/cases/${id}`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el caso");
    }
  },

  /**
   * Eliminar un caso
   */
  delete: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/cases/${id}`, getAuthHeaders());
    } catch (error) {
      throw new Error("Error al eliminar el caso");
    }
  },
};
