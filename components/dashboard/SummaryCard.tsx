interface SummaryCardProps {
  label: string;
  value: number;
  color: "primary" | "secondary";
}

export function SummaryCard({ label, value, color }: SummaryCardProps) {
  const bgColor = color === "primary" ? "#3a1259" : "#7c96de";
  const textColor = color === "primary" ? "#ffffff" : "#ffffff";

  return (
    <div
      className="p-6 rounded-lg text-white shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-sm font-medium opacity-90">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
