import { z } from "zod";

export type CaseStatus = "nuevo" | "en_proceso" | "finalizado";

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  description: string;
  createdAt: string;
}

export interface CaseFormData {
  title: string;
  status: CaseStatus;
  description: string;
}

export const caseSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  status: z.enum(["nuevo", "en_proceso", "finalizado"]),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const statusLabels: Record<CaseStatus, string> = {
  nuevo: "Nuevo",
  en_proceso: "En Proceso",
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
  en_proceso: {
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
