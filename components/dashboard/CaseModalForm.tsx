"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Case,
  CreateCaseRequest,
  UpdateCaseRequest,
  createCaseSchema,
  updateCaseSchema,
  statusLabels,
} from "@/lib/case";

interface CaseModalFormProps {
  isOpen: boolean;
  caseData?: Case;
  onClose: () => void;
  onSubmit: (data: CreateCaseRequest | UpdateCaseRequest) => void;
  isLoading?: boolean;
}

export function CaseModalForm({
  isOpen,
  caseData,
  onClose,
  onSubmit,
  isLoading = false,
}: CaseModalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCaseRequest | UpdateCaseRequest>({
    resolver: zodResolver(caseData ? updateCaseSchema : createCaseSchema),
    defaultValues: caseData
      ? {
          name: caseData.name,
          status: caseData.status,
          description: caseData.description,
        }
      : undefined,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: CreateCaseRequest | UpdateCaseRequest) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#3a1259]">
            {caseData ? "Editar Caso" : "Crear Nuevo Caso"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Caso
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Ej: Caso de Divorcio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c96de] placeholder-gray-500 text-black"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c96de] placeholder-gray-500 text-black"
            >
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe los detalles del caso..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7c96de] resize-none placeholder-gray-500 text-black"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex gap-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#7c96de] text-white rounded-lg hover:bg-[#3a1259] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : caseData ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
