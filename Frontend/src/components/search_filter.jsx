import { useState } from 'react';
import '../styles/components/search_filter.css';
import filter_icon from '../assets/icons/bars-filter-svgrepo-com.svg';

function Search_filter({ on_search_change, on_filter_change, filter_options = [], placeholder = "Search..." }) {
  const [search_term, set_search_term] = useState('');
  const [selected_filter, set_selected_filter] = useState('all');
  const [is_filter_open, set_is_filter_open] = useState(false);

  const handle_search_change = (event) => {
    const new_search_value = event.target.value;
    set_search_term(new_search_value);
    on_search_change(new_search_value);
  };

  const handle_filter_change = (filter_value) => {
    set_selected_filter(filter_value);
    on_filter_change(filter_value);
    set_is_filter_open(false);
  };

  const toggle_filter = () => {
    set_is_filter_open(!is_filter_open);
  };

  const clear_search = () => {
    set_search_term('');
    on_search_change('');
  };

  const has_search_term = search_term !== '';
  const has_filter_options = filter_options.length > 0;

  return (
    <div className="search_filter_container">
      <div className="search_box">
        <input
          type="text"
          className="search_input"
          placeholder={placeholder}
          value={search_term}
          onChange={handle_search_change}
        />
        {has_search_term === true && (
          <button className="clear_btn" onClick={clear_search}>
            ×
          </button>
        )}
      </div>

      {has_filter_options === true && (
        <div className="filter_box">
          <img 
            src={filter_icon} 
            alt="filter" 
            className="filter_icon" 
            onClick={toggle_filter}
          />
          {is_filter_open === true && (
            <div className="filter_dropdown">
              <button 
                className={`filter_option ${selected_filter === 'all' ? 'active' : ''}`}
                onClick={() => handle_filter_change('all')}
              >
                All
              </button>
              {filter_options.map((option) => (
                <button 
                  key={option.value}
                  className={`filter_option ${selected_filter === option.value ? 'active' : ''}`}
                  onClick={() => handle_filter_change(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search_filter;
