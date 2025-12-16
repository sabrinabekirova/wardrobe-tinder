import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/card-component';
import AddItemModal from '../components/add_item_modal';
import '../styles/pages/dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [is_modal_open, set_is_modal_open] = useState(false);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Wardrobe</h1>
      
      <div className="dashboard-buttons">
        <button 
          className="dashboard-btn"
          onClick={() => navigate('/create-outfit')}
        >
          Create Outfit
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => set_is_modal_open(true)}
        >
          Add Item
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => navigate('/view-outfits')}
        >
          Saved Outfits
        </button>
      </div>

      <div className="wardrobe-sections">
        <section className="wardrobe-section">
          <h2 className="section-title">Tops</h2>
          <div className="card-grid">
            <CardComponent 
              image="/path/to/image.jpg"
              description="Blue denim jacket"
            />
          </div>
        </section>

        <section className="wardrobe-section">
          <h2 className="section-title">Bottoms</h2>
          <div className="card-grid">
            <CardComponent 
              image="/path/to/image.jpg"
              description="Black jeans"
            />
          </div>
        </section>

        <section className="wardrobe-section">
          <h2 className="section-title">Accessories</h2>
          <div className="card-grid">
            <CardComponent 
              image="/path/to/image.jpg"
              description="Leather belt"
            />
          </div>
        </section>

        <section className="wardrobe-section">
          <h2 className="section-title">Other</h2>
          <div className="card-grid">
            <CardComponent 
              image="/path/to/image.jpg"
              description="Winter scarf"
            />
          </div>
        </section>
      </div>

      <AddItemModal 
        is_open={is_modal_open} 
        on_close={() => set_is_modal_open(false)} 
      />
    </div>
  );
}


export default DashboardPage;
