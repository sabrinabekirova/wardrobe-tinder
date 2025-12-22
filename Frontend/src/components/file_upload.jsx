import { useState } from 'react';

function FileUpload({ on_success }) {
  const [title, set_title] = useState('');
  const [file, set_file] = useState(null);
  const [preview, set_preview] = useState(null);
  const [tag, set_tag] = useState('top');

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

    const reader = new FileReader();
    
    reader.onload = async () => {
      try {
        const base64_image = reader.result;
        
        const response = await fetch('http://localhost:3000/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            image_url: base64_image,
            title: title,
            category: tag
          })
        });

        if (response.ok) {
          alert('Item uploaded successfully!');
          set_title('');
          set_file(null);
          set_preview(null);
          set_tag('top');
          on_success();
        } else {
          const data = await response.json();
          alert('Upload failed: ' + data.error);
        }
      } catch (error) {
        alert('Error uploading item');
      }
    };
    
    reader.onerror = () => {
      alert('Error reading file');
    };
    
    reader.readAsDataURL(file);
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