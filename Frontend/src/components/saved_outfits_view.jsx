import { useState } from 'react';
import Search_filter from './search_filter';

function Saved_outfits_view({ outfits, on_delete }) {
  const [search_term, set_search_term] = useState('');
  const [category_filter, set_category_filter] = useState('all');

  const handle_search = (value) => {
    set_search_term(value);
  };

  const handle_filter = (value) => {
    set_category_filter(value);
  };

  const filter_outfits = () => {
    return outfits.filter((outfit) => {
      const search_term_lowercase = search_term.toLowerCase();
      const outfit_name_lowercase = outfit.name.toLowerCase();
      const matches_search = outfit_name_lowercase.includes(search_term_lowercase);

      // Category filter logic
      let matches_category = false;
      if (category_filter === 'all') {
        matches_category = true;
      } else if (category_filter === 'tops') {
        matches_category = outfit.top_image !== null && outfit.top_image !== undefined;
      } else if (category_filter === 'bottoms') {
        matches_category = outfit.bottom_image !== null && outfit.bottom_image !== undefined;
      } else if (category_filter === 'accessories') {
        matches_category = outfit.accessory_image !== null && outfit.accessory_image !== undefined;
      } else if (category_filter === 'others') {
        matches_category = outfit.other_image !== null && outfit.other_image !== undefined;
      }

      return matches_search && matches_category;
    });
  };

  const filtered_outfits = filter_outfits();
  const number_of_outfits = outfits.length;
  const has_no_outfits = number_of_outfits === 0;
  const number_of_filtered_outfits = filtered_outfits.length;
  const has_no_filtered_outfits = number_of_filtered_outfits === 0;

  const filter_options = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'others', label: 'Others' }
  ];
  
  if (has_no_outfits === true) {
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
      
      {has_no_filtered_outfits === true && (
        <div className="empty_state">
          <p>No outfits match your search.</p>
        </div>
      )}

      {has_no_filtered_outfits === false && (
        <div className="outfits_grid">
          {filtered_outfits.map((outfit) => (
            <div key={outfit.id} className="outfit_card">
              <h3>{outfit.name}</h3>
              <div className="outfit_items">
                {outfit.top_image !== null && outfit.top_image !== undefined && (
                  <div className="outfit_item">
                    <img src={outfit.top_image} alt={outfit.top_title} />
                    <p>{outfit.top_title}</p>
                  </div>
                )}
                {outfit.bottom_image !== null && outfit.bottom_image !== undefined && (
                  <div className="outfit_item">
                    <img src={outfit.bottom_image} alt={outfit.bottom_title} />
                    <p>{outfit.bottom_title}</p>
                  </div>
                )}
                {outfit.accessory_image !== null && outfit.accessory_image !== undefined && (
                  <div className="outfit_item">
                    <img src={outfit.accessory_image} alt={outfit.accessory_title} />
                    <p>{outfit.accessory_title}</p>
                  </div>
                )}
                {outfit.other_image !== null && outfit.other_image !== undefined && (
                  <div className="outfit_item">
                    <img src={outfit.other_image} alt={outfit.other_title} />
                    <p>{outfit.other_title}</p>
                  </div>
                )}
              </div>
              <button onClick={() => on_delete(outfit.id)} className="delete_outfit_btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved_outfits_view;
