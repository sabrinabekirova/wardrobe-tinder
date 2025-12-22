import { useState, useEffect } from 'react';
import Wardrobe_view from '../components/wardrobe_view';
import Create_outfit_view from '../components/create_outfit_view';
import Saved_outfits_view from '../components/saved_outfits_view';
import Add_item_modal from '../components/add_item_modal';
import '../styles/pages/dashboard.css';

function Dashboard_page() {
  const [tops, set_tops] = useState([]);
  const [bottoms, set_bottoms] = useState([]);
  const [current_view, set_current_view] = useState('wardrobe');
  const [accessories, set_accessories] = useState([]);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [others, set_others] = useState([]);
  const [user_name, set_user_name] = useState('');
  const [outfits, set_outfits] = useState([]);

  useEffect(() => {
    fetch_user();
    fetch_items();
  }, []);

  useEffect(() => {
    if (current_view === 'outfits') fetch_outfits();
  }, [current_view]);

  const fetch_user = async () => {
    const res = await fetch('http://localhost:3000/auth/user', {
      credentials: 'include'
    });
    const data = await res.json();
    if (data.name) {
      set_user_name(data.name);
    }
  };

  const fetch_items = async () => {
    const res_tops = await fetch('http://localhost:3000/items?category=top', { credentials: 'include' });
    const data_tops = await res_tops.json();
    const tops_array = data_tops.data;
    set_tops(tops_array);

    const res_bottoms = await fetch('http://localhost:3000/items?category=bottom', { credentials: 'include' });
    const data_bottoms = await res_bottoms.json();
    set_bottoms(data_bottoms.data);

    const res_accessories = await fetch('http://localhost:3000/items?category=accessory', { credentials: 'include' });
    const data_accessories = await res_accessories.json();
    const accessories_array = data_accessories.data;
    set_accessories(accessories_array);

    const res_others = await fetch('http://localhost:3000/items?category=other', { credentials: 'include' });
    const data_others = await res_others.json();
    set_others(data_others.data);
  };

  const fetch_outfits = async () => {
    const res = await fetch('http://localhost:3000/outfits', { credentials: 'include' });
    const data = await res.json();
    set_outfits(data.data);
  };

  const handle_close_modal = () => {
    set_is_modal_open(false);
    fetch_items();
  };

  const handle_logout = () => {
    window.location.href = 'http://localhost:3000/auth/logout';
  };

  const handle_save_outfit = async (outfit_data) => {
    const res = await fetch('http://localhost:3000/outfits', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(outfit_data)
    });

    if (res.ok) {
      alert('Outfit saved!');
      set_current_view('wardrobe');
    } else {
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('Failed to save outfit');
      }
    }
  };

  const handle_delete_outfit = async (outfit_id) => {
    const confirm_delete = confirm('Delete this outfit?');
    if (!confirm_delete) {
      return;
    }

    const res = await fetch('http://localhost:3000/outfits/' + outfit_id, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (res.ok) {
      fetch_outfits();
    } else {
      alert('Failed to delete outfit');
    }
  };

  const get_page_title = () => {
    if (current_view === 'wardrobe') {
      return user_name + "'s Wardrobe";
    }
    if (current_view === 'create') {
      return 'Create Outfit';
    }
    if (current_view === 'outfits') {
      return 'Saved Outfits';
    }
    return user_name + "'s Wardrobe";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{get_page_title()}</h1>
        <button className="logout-btn" onClick={handle_logout}>Log Out</button>
      </div>
      
      <div className="dashboard-buttons">
        <button 
          className="dashboard-btn"
          onClick={() => set_current_view('wardrobe')}
        >
          View Wardrobe
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => set_current_view('create')}
        >
          Create Outfit
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => set_current_view('outfits')}
        >
          Saved Outfits
        </button>
        <button 
          className="dashboard-btn"
          onClick={() => set_is_modal_open(true)}
        >
          Add Item
        </button>
      </div>

      {current_view === 'wardrobe' && (
        <Wardrobe_view tops={tops} bottoms={bottoms} accessories={accessories} others={others} />
      )}
      
      {current_view === 'create' && (
        <Create_outfit_view 
          tops={tops} 
          bottoms={bottoms} 
          accessories={accessories} 
          others={others}
          on_save={handle_save_outfit} 
        />
      )}
      
      {current_view === 'outfits' && (
        <Saved_outfits_view outfits={outfits} on_delete={handle_delete_outfit} />
      )}

      <Add_item_modal is_open={is_modal_open} on_close={handle_close_modal} />
    </div>
  );
}

export default Dashboard_page;
