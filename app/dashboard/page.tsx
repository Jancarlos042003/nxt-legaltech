"use client";

import { useState, useEffect } from "react";
import { Case, CreateCaseRequest, UpdateCaseRequest } from "@/types/case";
import { CasesList } from "@/components/dashboard/CasesList";
import { CreateCaseModal } from "@/components/dashboard/CreateCaseModal";
import { EditCaseModal } from "@/components/dashboard/EditCaseModal";
import { ConfirmDialog } from "@/components/dashboard/ConfirmDialog";
import { caseService } from "@/services/caseService";

export default function DashboardPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<Case | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadCases = async () => {
    try {
      const data: Case[] = await caseService.getAll();
      setCases(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleCreateCase = async (data: CreateCaseRequest) => {
    try {
      const newCase: Case = await caseService.create(data);
      setCases([...cases, newCase]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creando caso:", error);
    }
  };

  const handleEditCase = async (data: UpdateCaseRequest) => {
    if (!editingCase) return;
    try {
      const updatedCase = await caseService.update(editingCase.id, data);
      setCases(cases.map((c) => (c.id === editingCase.id ? updatedCase : c)));
      setIsEditModalOpen(false);
      setEditingCase(undefined);
    } catch (error) {
      console.error("Error editando caso:", error);
    }
  };

  const handleDeleteCase = async () => {
    if (!caseToDelete) return;
    try {
      await caseService.delete(caseToDelete.id);
      setCases(cases.filter((c) => c.id !== caseToDelete.id));
      setIsConfirmOpen(false);
      setCaseToDelete(undefined);
    } catch (error) {
      console.error("Error eliminando caso:", error);
    }
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

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Cargando casos...</p>
            </div>
          ) : (
            <CasesList
              cases={cases}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteConfirm}
            />
          )}
        </section>
      </div>

      {/* Modals */}
      <CreateCaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCase}
      />

      {isEditModalOpen && editingCase && (
        <EditCaseModal
          isOpen={isEditModalOpen}
          caseData={editingCase}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCase(undefined);
          }}
          onSubmit={handleEditCase}
        />
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Eliminar Caso"
        message={`¿Estás seguro de que deseas eliminar el caso "${caseToDelete?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDeleteCase}
        onCancel={() => {
          setIsConfirmOpen(false);
          setCaseToDelete(undefined);
        }}
      />
    </main>
  );
}
