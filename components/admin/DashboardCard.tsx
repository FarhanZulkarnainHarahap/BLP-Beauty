export function DashboardCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="card p-6">
      <p className="text-xs font-bold uppercase tracking-wider text-[#8a746b]">{label}</p>
      <div className="mt-5 serif text-5xl">{value}</div>
      <p className="mt-2 text-xs text-[#8a746b]">{detail}</p>
    </div>
  );
}
