import { useState } from 'react';
import Search_filter from './search_filter';
import '../styles/components/saved_outfits_view.css';

function Saved_outfits_view({ outfits, on_delete }) {
  const [category_filter, set_category_filter] = useState('all');
  const [search_term, set_search_term] = useState('');

  const handle_search = (value) => {
    set_search_term(value);
  };

  const handle_filter = (value) => {
    set_category_filter(value);
  };

  const filter_outfits = () => {
    return outfits.filter(function(outfit) {
      const search_term_lowercase = search_term.toLowerCase();
      const outfit_name_lowercase = outfit.name.toLowerCase();
      const matches_search = outfit_name_lowercase.includes(search_term_lowercase);

      // Category filter logic
      let matches_category = false;
      if (category_filter === 'all') {
        matches_category = true;
      } else if (category_filter === 'tops') {
        if (outfit.top_image) {
          matches_category = true;
        }
      } else if (category_filter === 'bottoms') {
        if (outfit.bottom_image) {
          matches_category = true;
        }
      } else if (category_filter === 'accessories') {
        if (outfit.accessory_image) {
          matches_category = true;
        }
      } else if (category_filter === 'others') {
        if (outfit.other_image) {
          matches_category = true;
        }
      }

      if (matches_search && matches_category) {
        return true;
      } else {
        return false;
      }
    });
  };

  const filtered_outfits = filter_outfits();
  const number_of_outfits = outfits.length;
  const has_no_outfits = (number_of_outfits === 0);
  const number_of_filtered_outfits = filtered_outfits.length;
  const has_no_filtered_outfits = (number_of_filtered_outfits === 0);

  const filter_options = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'others', label: 'Others' }
  ];
  
  if (has_no_outfits) {
    return (
      <div className="empty_state">
        <p>No saved outfits yet. Create your first outfit!</p>
      </div>
    );
  }

  return (
    <div>
      <Search_filter 
        on_search_change={handle_search}
        on_filter_change={handle_filter}
        filter_options={filter_options}
        placeholder="Search outfits..."
      />
      
      {has_no_filtered_outfits && (
        <div className="empty_state">
          <p>No outfits match your search.</p>
        </div>
      )}

      {!has_no_filtered_outfits && (
        <div className="outfits-grid">
          {filtered_outfits.map(function(outfit) {
            const outfit_images = [];
            if (outfit.top_image) outfit_images.push(outfit.top_image);
            if (outfit.bottom_image) outfit_images.push(outfit.bottom_image);
            if (outfit.accessory_image) outfit_images.push(outfit.accessory_image);
            if (outfit.other_image) outfit_images.push(outfit.other_image);

            return (
              <div key={outfit.id} className="outfit-card">
                <div className="card-actions">
                  <button 
                    className="card-action-btn delete-btn" 
                    onClick={() => on_delete(outfit)}
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="outfit-images-stack">
                  {outfit_images.map(function(image, index) {
                    return (
                      <img 
                        key={index} 
                        src={image} 
                        alt="outfit item" 
                        className="outfit-stack-image"
                        style={{ zIndex: outfit_images.length - index }}
                      />
                    );
                  })}
                </div>
                
                <p className="outfit-title">{outfit.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Saved_outfits_view;
