"use client";

import { useState } from "react";
import { Case, CaseFormData } from "@/lib/case";
import { CasesList } from "@/components/dashboard/CasesList";
import { CaseModalForm } from "@/components/dashboard/CaseModalForm";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";

const initialCases: Case[] = [
  {
    id: "1",
    title: "Caso de Divorcio - García vs García",
    status: "en_proceso",
    description: "Proceso de divorcio contencioso con división de bienes",
    createdAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: "2",
    title: "Demanda Laboral - Empresa XYZ",
    status: "nuevo",
    description: "Despido injustificado, reclamación de indemnización",
    createdAt: new Date("2024-02-20").toISOString(),
  },
  {
    id: "3",
    title: "Contrato Mercantil - ABC Corp",
    status: "finalizado",
    description: "Revisión y negociación de contrato de servicios",
    createdAt: new Date("2024-02-01").toISOString(),
  },
];

export default function DashboardPage() {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<Case | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCreateCase = (data: CaseFormData) => {
    const newCase: Case = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setCases([...cases, newCase]);
    setIsCreateModalOpen(false);
  };

  const handleEditCase = (data: CaseFormData) => {
    if (!editingCase) return;
    setCases(
      cases.map((c) =>
        c.id === editingCase.id
          ? {
              ...c,
              ...data,
            }
          : c
      )
    );
    setIsEditModalOpen(false);
    setEditingCase(undefined);
  };

  const handleDeleteCase = () => {
    if (!caseToDelete) return;
    setCases(cases.filter((c) => c.id !== caseToDelete.id));
    setIsConfirmOpen(false);
    setCaseToDelete(undefined);
  };

  const handleOpenEditModal = (caseItem: Case) => {
    setEditingCase(caseItem);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteConfirm = (caseItem: Case) => {
    setCaseToDelete(caseItem);
    setIsConfirmOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#3a1259]">Mis Casos</h2>
              <p className="text-gray-600 mt-1">
                Gestiona todos tus casos legales
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-[#7c96de] text-white font-medium rounded-lg hover:bg-[#3a1259] transition-colors shadow-md"
            >
              + Crear Caso
            </button>
          </div>
          <CasesList
            cases={cases}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteConfirm}
          />
        </section>
      </div>

      {/* Modals */}
      <CaseModalForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCase}
      />

      <CaseModalForm
        isOpen={isEditModalOpen}
        caseData={editingCase}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingCase(undefined);
        }}
        onSubmit={handleEditCase}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Eliminar Caso"
        message={`¿Estás seguro de que deseas eliminar el caso "${caseToDelete?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDeleteCase}
        onCancel={() => {
          setIsConfirmOpen(false);
          setCaseToDelete(undefined);
        }}
      />
    </main>
  );
}
