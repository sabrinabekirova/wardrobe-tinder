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
    if (top_index < tops.length - 1) {
      set_top_index(top_index + 1);
    } else {
      set_top_index(0);
    }
  };

  const prev_top = () => {
    if (top_index > 0) {
      set_top_index(top_index - 1);
    } else {
      set_top_index(tops.length - 1);
    }
  };

  const next_bottom = () => {
    if (bottom_index < bottoms.length - 1) {
      set_bottom_index(bottom_index + 1);
    } else {
      set_bottom_index(0);
    }
  };

  const prev_bottom = () => {
    if (bottom_index > 0) {
      set_bottom_index(bottom_index - 1);
    } else {
      set_bottom_index(bottoms.length - 1);
    }
  };

  const next_accessory = () => {
    if (accessory_index < accessories.length - 1) {
      set_accessory_index(accessory_index + 1);
    } else {
      set_accessory_index(0);
    }
  };

  const prev_accessory = () => {
    if (accessory_index > 0) {
      set_accessory_index(accessory_index - 1);
    } else {
      set_accessory_index(accessories.length - 1);
    }
  };

  const next_other = () => {
    if (other_index < others.length - 1) {
      set_other_index(other_index + 1);
    } else {
      set_other_index(0);
    }
  };

  const prev_other = () => {
    if (other_index > 0) {
      set_other_index(other_index - 1);
    } else {
      set_other_index(others.length - 1);
    }
  };

  const toggle_category = (category) => {
    if (selected_categories.includes(category)) {
      const new_categories = selected_categories.filter(c => c !== category);
      if (new_categories.length >= 2) {
        set_selected_categories(new_categories);
      } else {
        alert('You must select at least 2 categories');
      }
    } else {
      set_selected_categories([...selected_categories, category]);
    }
  };

  const handle_save = () => {
    if (outfit_name === '') {
      alert('Please enter an outfit name');
      return;
    }

    if (selected_categories.length < 2) {
      alert('Please select at least 2 categories');
      return;
    }

    const current_top = selected_categories.includes('top') ? tops[top_index] : null;
    const current_bottom = selected_categories.includes('bottom') ? bottoms[bottom_index] : null;
    const current_accessory = selected_categories.includes('accessory') ? accessories[accessory_index] : null;
    const current_other = selected_categories.includes('other') ? others[other_index] : null;

    on_save({
      name: outfit_name,
      top_id: current_top ? current_top.id : null,
      bottom_id: current_bottom ? current_bottom.id : null,
      accessory_id: current_accessory ? current_accessory.id : null,
      other_id: current_other ? current_other.id : null
    });

    set_outfit_name('');
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
