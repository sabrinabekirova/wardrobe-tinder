import FileUpload from './file_upload';
import '../styles/components/add_item_modal.css';

function AddItemModal({ is_open, on_close }) {
  if (!is_open) return null;

  return (
    <div className="modal-overlay" onClick={on_close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={on_close}>×</button>
        <FileUpload on_success={on_close} />
      </div>
    </div>
  );
}

export default AddItemModal;
