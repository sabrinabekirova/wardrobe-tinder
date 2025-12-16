import React from 'react';
import '../styles/components/card-component.css';

const CardComponent = ({ image, description, onClick }) => {
  return (
    <div className="clothing-card" onClick={onClick}>
      <div className="card-image">
        <img src={image} alt={description} />
      </div>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default CardComponent;
