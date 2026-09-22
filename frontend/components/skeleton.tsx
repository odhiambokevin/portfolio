export default function SectionSkeleton({ label }: { label: string }) {
  return (
    <div className="archive-list">
        <p className="empty-results">{label} loading.....</p>
      </div>
  );
}