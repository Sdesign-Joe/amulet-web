export default function PhBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-blue-light to-brand-blue-deep text-white shadow-md ${className}`}
    >
      <span className="text-[10px] font-medium uppercase tracking-wide opacity-90">
        pH
      </span>
      <span className="text-xl font-bold leading-none">8,2</span>
    </div>
  );
}
