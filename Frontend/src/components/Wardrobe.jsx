import { useState, useEffect } from 'react'

function Wardrobe() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/items')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="container">
      <h2>My Wardrobe</h2>
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img src={'http://localhost:3000' + item.image_url} alt={item.category} />
            <p>{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wardrobe
