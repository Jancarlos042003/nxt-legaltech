import { CaseStatus, statusLabels, statusColors } from "@/lib/case";

interface CaseStatusBadgeProps {
  status: CaseStatus;
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  const colors = statusColors[status];
  const label = statusLabels[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
    >
      {label}
    </span>
  );
}
