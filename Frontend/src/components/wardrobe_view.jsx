import { useState } from 'react';
import CardComponent from './card-component';
import Search_filter from './search_filter';

function Wardrobe_view({ tops, bottoms, accessories, others }) {
  const [search_term, set_search_term] = useState('');
  const [category_filter, set_category_filter] = useState('all');

  const handle_search = (value) => {
    set_search_term(value);
  };

  const handle_filter = (value) => {
    set_category_filter(value);
  };

  const filter_items = (items) => {
    return items.filter((item) => {
      const search_term_lowercase = search_term.toLowerCase();
      const item_title_lowercase = item.title.toLowerCase();
      const matches_search = item_title_lowercase.includes(search_term_lowercase);
      return matches_search;
    });
  };

  const filtered_tops = filter_items(tops);
  const filtered_bottoms = filter_items(bottoms);
  const filtered_accessories = filter_items(accessories);
  const filtered_others = filter_items(others);

  const filter_options = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'others', label: 'Others' }
  ];

  const should_show_tops = category_filter === 'all' || category_filter === 'tops';
  const should_show_bottoms = category_filter === 'all' || category_filter === 'bottoms';
  const should_show_accessories = category_filter === 'all' || category_filter === 'accessories';
  const should_show_others = category_filter === 'all' || category_filter === 'others';

  return (
    <div>
      <Search_filter 
        on_search_change={handle_search}
        on_filter_change={handle_filter}
        filter_options={filter_options}
        placeholder="Search wardrobe..."
      />
      
      <div className="wardrobe-sections">
        {should_show_tops === true && (
          <section className="wardrobe-section">
            <h2 className="section-title">Tops</h2>
            <div className="card-grid">
              {filtered_tops.map((item) => (
                <CardComponent key={item.id} image={item.image_url} description={item.title} />
              ))}
            </div>
          </section>
        )}

        {should_show_bottoms === true && (
          <section className="wardrobe-section">
            <h2 className="section-title">Bottoms</h2>
            <div className="card-grid">
              {filtered_bottoms.map((item) => (
                <CardComponent key={item.id} image={item.image_url} description={item.title} />
              ))}
            </div>
          </section>
        )}

        {should_show_accessories === true && (
          <section className="wardrobe-section">
            <h2 className="section-title">Accessories</h2>
            <div className="card-grid">
              {filtered_accessories.map((item) => (
                <CardComponent key={item.id} image={item.image_url} description={item.title} />
              ))}
            </div>
          </section>
        )}

        {should_show_others === true && (
          <section className="wardrobe-section">
            <h2 className="section-title">Others</h2>
            <div className="card-grid">
              {filtered_others.map((item) => (
                <CardComponent key={item.id} image={item.image_url} description={item.title} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Wardrobe_view;
