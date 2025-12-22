import { useState } from 'react';
import '../styles/components/delete_confirm_modal.css';

function Delete_confirm_modal({ is_open, item, on_close, on_confirm }) {
  const [is_deleting, set_is_deleting] = useState(false);

  if (!is_open || !item) {
    return null;
  }

  const handle_confirm = async () => {
    set_is_deleting(true);
    await on_confirm(item.id);
    set_is_deleting(false);
    on_close();
  };

  const handle_background_click = () => {
    if (!is_deleting) {
      on_close();
    }
  };

  const handle_content_click = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handle_background_click}>
      <div className="modal-content delete-modal" onClick={handle_content_click}>
        <button className="modal-close" onClick={on_close} disabled={is_deleting}>×</button>
        <h2 className="modal-title">Delete Item</h2>
        
        <p className="delete-message">
          Are you sure you want to delete <strong>"{item.title}"</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={on_close}
            disabled={is_deleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-delete"
            onClick={handle_confirm}
            disabled={is_deleting}
          >
            {is_deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete_confirm_modal;
