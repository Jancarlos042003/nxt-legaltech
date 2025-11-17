export interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  createdAt: string;
}

export type CaseStatus = "nuevo" | "en_proceso" | "finalizado";

export interface CaseFormData {
  title: string;
  description?: string;
  status: CaseStatus;
}

export interface CreateCaseRequest {
  title: string;
  description: string;
  status?: CaseStatus;
}

export interface UpdateCaseRequest {
  title?: string;
  description?: string;
  status?: CaseStatus;
}
