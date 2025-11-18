import { z } from "zod";

export type CaseStatus = "nuevo" | "en progreso" | "finalizado";

export interface Case {
  id: string;
  name: string;
  description: string;
  status: CaseStatus;
  created_at: string;
}

export interface CreateCaseRequest {
  name: string;
  description: string;
  status?: CaseStatus;
}

export interface UpdateCaseRequest {
  name?: string;
  description?: string;
  status?: CaseStatus;
}

export const statusLabels: Record<CaseStatus, string> = {
  nuevo: "Nuevo",
  "en progreso": "En Progreso",
  finalizado: "Finalizado",
};

export const statusColors: Record<
  CaseStatus,
  { bg: string; text: string; border: string }
> = {
  nuevo: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "en progreso": {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  finalizado: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
};

export const caseSchema = z.object({
  name: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  status: z.enum(["nuevo", "en progreso", "finalizado"]),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const createCaseSchema = z.object({
  name: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  status: z.enum(["nuevo", "en progreso", "finalizado"]).default("nuevo"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const updateCaseSchema = z.object({
  name: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .optional(),
  status: z.enum(["nuevo", "en progreso", "finalizado"]).optional(),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .optional(),
});
