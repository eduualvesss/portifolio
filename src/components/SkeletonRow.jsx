export default function SkeletonRow() {
  return (
    <div className="ledger-row ledger-row--skeleton" aria-hidden="true">
      <div className="ledger-row__id">
        <span className="skeleton-block skeleton-block--id" />
      </div>
      <div className="ledger-row__main">
        <span className="skeleton-block skeleton-block--title" />
        <span className="skeleton-block skeleton-block--desc" />
      </div>
      <div className="ledger-row__meta">
        <span className="skeleton-block skeleton-block--meta" />
        <span className="skeleton-block skeleton-block--meta" />
      </div>
    </div>
  );
}
