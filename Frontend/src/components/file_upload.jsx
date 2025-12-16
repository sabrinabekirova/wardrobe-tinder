import { useState } from 'react';

function FileUpload({ on_success }) {
  const [file, set_file] = useState(null);
  const [title, set_title] = useState('');
  const [tag, set_tag] = useState('top');
  const [preview, set_preview] = useState(null);

  const handle_file_change = (e) => {
    const selected_file = e.target.files[0];
    if (selected_file) {
      set_file(selected_file);
      set_preview(URL.createObjectURL(selected_file));
    }
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    
    if (!file || !title) {
      alert('Please select a file and enter a title');
      return;
    }

    const form_data = new FormData();
    form_data.append('file', file);
    form_data.append('title', title);
    form_data.append('tag', tag);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: form_data,
        credentials: 'include', // This sends cookies for session authentication
      });

      if (response.ok) {
        alert('Item uploaded successfully!');
        // Reset form
        set_file(null);
        set_title('');
        set_tag('top');
        set_preview(null);
        if (on_success) on_success();
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error uploading item');
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Add New Item</h2>
      <form onSubmit={handle_submit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => set_title(e.target.value)}
            placeholder="Enter item title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Category:</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => set_tag(e.target.value)}
            required
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="accessory">Accessory</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Image:</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handle_file_change}
            required
          />
        </div>

        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Upload Item
        </button>
      </form>
    </div>
  );
}

export default FileUpload;