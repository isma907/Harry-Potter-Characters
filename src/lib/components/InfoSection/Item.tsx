export const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-[10px]">
    <p className="text-character-item-label">{label}</p>
    <p className="text-character-item-description">{value}</p>
  </div>
);
