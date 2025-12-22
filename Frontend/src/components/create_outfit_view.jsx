import { useState } from 'react';
import '../styles/pages/create_outfit.css';

function Create_outfit_view({ tops, bottoms, accessories, others, on_save }) {
  const [top_index, set_top_index] = useState(0);
  const [bottom_index, set_bottom_index] = useState(0);
  const [accessory_index, set_accessory_index] = useState(0);
  const [other_index, set_other_index] = useState(0);
  const [outfit_name, set_outfit_name] = useState('');
  const [selected_categories, set_selected_categories] = useState(['top', 'bottom', 'accessory']);

  const next_top = () => {
    const new_index = top_index + 1;
    if (new_index >= tops.length) {
      set_top_index(0);
    } else {
      set_top_index(new_index);
    }
  };

  const prev_top = () => {
    const new_index = top_index-1;
    if (new_index < 0) {
      set_top_index(tops.length-1);
    } else {
      set_top_index(new_index);
    }
  };

  const next_bottom = () =>{
    const new_index = bottom_index + 1;
    if (new_index >= bottoms.length) {
      set_bottom_index(0);
    } else {
      set_bottom_index(new_index);
    }
  };

  const prev_bottom = () => {
    const new_index = bottom_index - 1;
    if (new_index < 0) {
      set_bottom_index(bottoms.length - 1);
    } else {
      set_bottom_index(new_index);
    }
  };

  const next_accessory = () => {
    const new_index = accessory_index + 1;
    if (new_index >= accessories.length) {
      set_accessory_index(0);
    } else {
      set_accessory_index(new_index);
    }
  };

  const prev_accessory = () => {
    const new_index = accessory_index - 1;
    if (new_index < 0) {
      set_accessory_index(accessories.length - 1);
    } else {
      set_accessory_index(new_index);
    }
  };

  const next_other = () => {
    const new_index = other_index + 1;
    if (new_index >= others.length) {
      set_other_index(0);
    } else {
      set_other_index(new_index);
    }
  };

  const prev_other = () => {
    const new_index = other_index - 1;
    if (new_index < 0) {
      set_other_index(others.length - 1);
    } else {
      set_other_index(new_index);
    }
  };

  const toggle_category = (category) => {
    const is_selected = selected_categories.includes(category);
    
    if (is_selected) {
      const new_categories = selected_categories.filter(function(c) {
        return c !== category;
      });
      
      if (new_categories.length >= 2) {
        set_selected_categories(new_categories);
      } else {
        alert('You must select at least 2 categories');
      }
    } else {
      const new_categories = selected_categories.concat(category);
      set_selected_categories(new_categories);
    }
  };
//saves outfit
  const handle_save = () => {
    if (selected_categories.length < 2) {
      alert('Please select at least 2 categories'); //need at least 2 items to make an outfit
      return;
    }

    if (outfit_name === '') {
      alert('Please enter an outfit name');
      return;
    }

    //outfit data
    let current_top = null;
    if (selected_categories.includes('top')) {
      current_top = tops[top_index];
    }
    let top_id = null;
    if (current_top) {
      top_id = current_top.id;
    }
    
    let current_bottom = null;
    if (selected_categories.includes('bottom')) {
      current_bottom = bottoms[bottom_index];
    }
    let bottom_id = null;
    if (current_bottom) {
      bottom_id = current_bottom.id;
    }
    
    let current_accessory = null;
    if (selected_categories.includes('accessory')) {
      current_accessory = accessories[accessory_index];
    }
    let accessory_id = null;
    if (current_accessory) {
      accessory_id = current_accessory.id;
    }
    
    let current_other = null;
    if (selected_categories.includes('other')) {
      current_other = others[other_index];
    }
    let other_id = null;
    if (current_other) {
      other_id = current_other.id;
    }

    on_save({
      name: outfit_name,
      top_id: top_id,
      bottom_id: bottom_id,
      accessory_id: accessory_id,
      other_id: other_id
    });

    set_outfit_name(''); //reset outfit name after saving
  };

  return (
    <div className="create_outfit_container">
      <div className="category_selection">
        <label className="category_checkbox">
          <input
            type="checkbox"
            checked={selected_categories.includes('top')}
            onChange={() => toggle_category('top')}
          />
          <span className="checkbox_label">Tops</span>
        </label>
        <label className="category_checkbox">
          <input
            type="checkbox"
            checked={selected_categories.includes('bottom')}
            onChange={() => toggle_category('bottom')}
          />
          <span className="checkbox_label">Bottoms</span>
        </label>
        <label className="category_checkbox">
          <input
            type="checkbox"
            checked={selected_categories.includes('accessory')}
            onChange={() => toggle_category('accessory')}
          />
          <span className="checkbox_label">Accessories</span>
        </label>
        <label className="category_checkbox">
          <input
            type="checkbox"
            checked={selected_categories.includes('other')}
            onChange={() => toggle_category('other')}
          />
          <span className="checkbox_label">Others</span>
        </label>
      </div>

      {selected_categories.includes('top') && (
        <div className="outfit_row">
          <button onClick={prev_top} disabled={tops.length === 0} className="arrow_btn">&lt;</button>
          <div className="item_display">
            {tops[top_index] ? (
              <img src={tops[top_index].image_url} alt="top" />
            ) : <p>No tops</p>}
          </div>
          <button onClick={next_top} disabled={tops.length === 0} className="arrow_btn">&gt;</button>
        </div>
      )}

      {selected_categories.includes('bottom') && (
        <div className="outfit_row">
          <button onClick={prev_bottom} disabled={bottoms.length === 0} className="arrow_btn">&lt;</button>
          <div className="item_display">
            {bottoms[bottom_index] ? (
              <img src={bottoms[bottom_index].image_url} alt="bottom" />
            ) : <p>No bottoms</p>}
          </div>
          <button onClick={next_bottom} disabled={bottoms.length === 0} className="arrow_btn">&gt;</button>
        </div>
      )}

      {selected_categories.includes('accessory') && (
        <div className="outfit_row">
          <button onClick={prev_accessory} disabled={accessories.length === 0} className="arrow_btn">&lt;</button>
          <div className="item_display">
            {accessories[accessory_index] ? (
              <img src={accessories[accessory_index].image_url} alt="accessory" />
            ) : <p>No accessories</p>}
          </div>
          <button onClick={next_accessory} disabled={accessories.length === 0} className="arrow_btn">&gt;</button>
        </div>
      )}

      {selected_categories.includes('other') && (
        <div className="outfit_row">
          <button onClick={prev_other} disabled={others.length === 0} className="arrow_btn">&lt;</button>
          <div className="item_display">
            {others[other_index] ? (
              <img src={others[other_index].image_url} alt="other" />
            ) : <p>No others</p>}
          </div>
          <button onClick={next_other} disabled={others.length === 0} className="arrow_btn">&gt;</button>
        </div>
      )}

      <input
        type="text"
        value={outfit_name}
        onChange={(e) => set_outfit_name(e.target.value)}
        placeholder="Outfit name"
        className="outfit_name_input"
      />

      <button className="save_outfit_btn" onClick={handle_save}>Save Outfit</button>
    </div>
  );
}

export default Create_outfit_view;
