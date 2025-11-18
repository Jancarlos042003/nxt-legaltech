import { Case } from "@/types/case";
import { CaseCard } from "./CaseCard";

interface CasesListProps {
  cases: Case[];
  onEdit: (caseItem: Case) => void;
  onDelete: (caseItem: Case) => void;
}

export function CasesList({ cases, onEdit, onDelete }: CasesListProps) {
  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No hay casos registrados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          onEdit={() => onEdit(caseItem)}
          onDelete={() => onDelete(caseItem)}
        />
      ))}
    </div>
  );
}
