export function SettingsModal({ onDone }: { onDone: () => void }) {
  return (
    <div className="modal-wrap" role="dialog" aria-modal="true" aria-label="Settings">
      <div className="modal">
        <div className="modal-head">
          <strong>Settings (demo)</strong>
          <button type="button" className="icon-btn" aria-label="Close settings" onClick={onDone}>
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
        <p>Notifications, language and privacy controls will live here. Demo only.</p>
        <button type="button" className="btn btn-primary btn-full" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
}
