interface CaseActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function CaseActions({ onEdit, onDelete }: CaseActionsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-[#7c96de] text-[#7c96de] hover:bg-[#7c96de] hover:text-white transition-colors"
      >
        Editar
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
      >
        Eliminar
      </button>
    </div>
  );
}
