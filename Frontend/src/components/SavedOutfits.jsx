import { useState, useEffect } from 'react'

function SavedOutfits() {
  const [outfits, setOutfits] = useState([])

  useEffect(() => {
    fetchOutfits()
  }, [])

  const fetchOutfits = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/outfits')
      const data = await response.json()
      setOutfits(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container">
      <h2>Saved Outfits</h2>
      <div className="outfits-list">
        {outfits.map(outfit => (
          <div key={outfit.id} className="outfit-card">
            <h3>{outfit.name || 'Outfit #' + outfit.id}</h3>
            <div className="outfit-items">
              {outfit.top && (
                <div className="outfit-item">
                  <img src={'http://localhost:3000' + outfit.top.image_url} alt="top" />
                  <p>Top</p>
                </div>
              )}
              {outfit.bottom && (
                <div className="outfit-item">
                  <img src={'http://localhost:3000' + outfit.bottom.image_url} alt="bottom" />
                  <p>Bottom</p>
                </div>
              )}
              {outfit.shoes && (
                <div className="outfit-item">
                  <img src={'http://localhost:3000' + outfit.shoes.image_url} alt="shoes" />
                  <p>Shoes</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedOutfits
