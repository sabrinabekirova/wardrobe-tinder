import FileUpload from './file_upload';
import '../styles/components/add_item_modal.css';

function Add_item_modal({ is_open, on_close }) {
  if (!is_open) {
    return null;
  }

  const handle_background_click = () => {
    on_close();
  };

  const handle_content_click = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handle_background_click}>
      <div className="modal-content" onClick={handle_content_click}>
        <button className="modal-close" onClick={on_close}>×</button>
        <FileUpload on_success={on_close} />
      </div>
    </div>
  );
}

export default Add_item_modal;
