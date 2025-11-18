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
