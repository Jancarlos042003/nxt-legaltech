import { Case } from "@/lib/case";
import { CaseStatusBadge } from "./CaseStatusBadge";
import { CaseActions } from "./CaseActions";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface CaseCardProps {
  caseItem: Case;
  onEdit: () => void;
  onDelete: () => void;
}

export function CaseCard({ caseItem, onEdit, onDelete }: CaseCardProps) {
  const formattedDate = formatDistanceToNow(new Date(caseItem.created_at), {
    addSuffix: true,
    locale: es,
  });

  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-[#3a1259] flex-1">
          {caseItem.name}
        </h3>
        <CaseStatusBadge status={caseItem.status} />
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {caseItem.description}
      </p>

      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">{formattedDate}</p>
        <CaseActions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
