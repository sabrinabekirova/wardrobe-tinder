import { useState } from 'react'

function Upload() {
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('top')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Uploading file:', file) // Debug log
    
    if (!file) {
      setMessage('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('category', category)

    try {
      const response = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        setMessage('Item uploaded successfully!')
        setFile(null)
        document.getElementById('fileInput').value = ''
      } else {
        setMessage('Upload failed')
      }
    } catch (error) {
      setMessage('Error: ' + error.message)
    }
  }

  return (
    <div className="container">
      <h2>Upload Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Image:</label>
          <input 
            id="fileInput"
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
        
        <button type="submit">Upload</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Upload
