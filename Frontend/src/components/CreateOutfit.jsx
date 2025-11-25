import { useState, useEffect } from 'react'

function CreateOutfit() {
  const [tops, setTops] = useState([])
  const [bottoms, setBottoms] = useState([])
  const [shoes, setShoes] = useState([])
  const [selectedTop, setSelectedTop] = useState('')
  const [selectedBottom, setSelectedBottom] = useState('')
  const [selectedShoes, setSelectedShoes] = useState('')
  const [outfitName, setOutfitName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchItemsByCategory()
  }, [])

  const fetchItemsByCategory = async () => {
    try {
      const topsRes = await fetch('http://localhost:3000/api/items/top')
      const bottomsRes = await fetch('http://localhost:3000/api/items/bottom')
      const shoesRes = await fetch('http://localhost:3000/api/items/shoes')
      
      setTops(await topsRes.json())
      setBottoms(await bottomsRes.json())
      setShoes(await shoesRes.json())
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const handleSaveOutfit = async () => {
    if (!selectedTop || !selectedBottom || !selectedShoes) {
      setMessage('Please select items from all categories')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/outfits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: outfitName || 'My Outfit',
          top_id: selectedTop,
          bottom_id: selectedBottom,
          shoes_id: selectedShoes
        })
      })

      if (response.ok) {
        setMessage('Outfit saved!')
        setOutfitName('')
        setSelectedTop('')
        setSelectedBottom('')
        setSelectedShoes('')
      }
    } catch (error) {
      setMessage('Error saving outfit')
    }
  }

  return (
    <div className="container">
      <h2>Create Outfit</h2>
      
      <div className="form-group">
        <label>Outfit Name:</label>
        <input 
          type="text" 
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="outfit-selector">
        <div className="category-section">
          <h3>Select Top</h3>
          <div className="items-grid">
            {tops.map(item => (
              <div 
                key={item.id} 
                className={`item-card ${selectedTop == item.id ? 'selected' : ''}`}
                onClick={() => setSelectedTop(item.id)}
              >
                {/* Using == instead of === here - works but not best practice */}
                <img src={'http://localhost:3000' + item.image_url} alt="top" />
              </div>
            ))}
          </div>
        </div>

        <div className="category-section">
          <h3>Select Bottom</h3>
          <div className="items-grid">
            {bottoms.map(item => (
              <div 
                key={item.id} 
                className={`item-card ${selectedBottom == item.id ? 'selected' : ''}`}
                onClick={() => setSelectedBottom(item.id)}
              >
                <img src={'http://localhost:3000' + item.image_url} alt="bottom" />
              </div>
            ))}
          </div>
        </div>

        <div className="category-section">
          <h3>Select Shoes</h3>
          <div className="items-grid">
            {shoes.map(item => (
              <div 
                key={item.id} 
                className={`item-card ${selectedShoes == item.id ? 'selected' : ''}`}
                onClick={() => setSelectedShoes(item.id)}
              >
                <img src={'http://localhost:3000' + item.image_url} alt="shoes" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSaveOutfit}>Save Outfit</button>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default CreateOutfit
