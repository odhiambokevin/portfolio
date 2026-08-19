export default function SectionSkeleton({ label }: { label: string }) {
  return (
    <div className="py-16 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-sm">loading {label}...</div>
    </div>
  );
}