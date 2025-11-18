import { z } from "zod";

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
