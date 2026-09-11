// Reads like an instrument waiting on a response, because that is
// literally what it is: GitHub hasn't answered yet.
export default function LedgerStatus({ label }) {
  return (
    <div className="ledger-status" aria-live="polite">
      {label}
      <span className="ledger-status__cursor" aria-hidden="true" />
    </div>
  );
}
