# Wardrobe Tinder - Project Summary

## What Was Built

A simple wardrobe management web application that allows users to:
- Upload clothing item photos
- Tag items by category (top, bottom, shoes)
- Create outfits by selecting items from each category
- Save and view outfit combinations

## Implementation Details

### Backend (Node.js + Express)
- **File**: `Backend/routes.js` - Main API routes
- **File**: `Backend/db.js` - Database connection and initialization
- **File**: `Backend/app.js` - Express app setup with CORS

#### API Endpoints:
- `GET /api/items` - Get all clothing items
- `POST /api/items` - Upload new clothing item
- `GET /api/items/:category` - Get items by category
- `POST /api/outfits` - Create new outfit
- `GET /api/outfits` - Get all saved outfits

### Frontend (React)
5 main components:

1. **Login.jsx** - Google OAuth authentication
2. **Upload.jsx** - Upload clothing items with category selection
3. **Wardrobe.jsx** - Display grid of all clothing items
4. **CreateOutfit.jsx** - Select items from each category to create outfit
5. **SavedOutfits.jsx** - View all saved outfit combinations

### Database (MySQL)
Two tables:
- `items` - Stores clothing items (id, image_url, category, created_at)
- `outfits` - Stores outfit combinations (id, name, top_id, bottom_id, shoes_id, created_at)

## Features Implemented

✅ **Google OAuth Login** - Real external API integration
✅ Upload clothing item photos
✅ Tag items by category (dropdown: top/bottom/shoes)
✅ Create outfits by selecting one item from each category
✅ Save outfit combinations to database
✅ View all wardrobe items in grid
✅ View saved outfits with images
✅ Protected routes (login required)

## Technical Stack
- React (Frontend)
- React Router (Navigation)
- **Google OAuth 2.0** (Authentication - REAL API)
- Express.js (Backend)
- MySQL (Database)
- Multer (File uploads)
- Docker (Database containerization)

## Files Created/Modified

### Backend:
- `Backend/db.js` - NEW
- `Backend/routes.js` - NEW
- `Backend/app.js` - MODIFIED
- `Backend/public/uploads/` - NEW (upload directory)

### Frontend:
- `Frontend/src/App.jsx` - MODIFIED (OAuth provider, auth routing)
- `Frontend/src/App.css` - MODIFIED
- `Frontend/src/components/Login.jsx` - NEW (Google OAuth)
- `Frontend/src/components/Upload.jsx` - NEW
- `Frontend/src/components/Wardrobe.jsx` - NEW
- `Frontend/src/components/CreateOutfit.jsx` - NEW
- `Frontend/src/components/SavedOutfits.jsx` - NEW

### Documentation:
- `README.md` - NEW
- `DEPLOYMENT.md` - NEW  
- `GOOGLE_OAUTH_SETUP.md` - NEW

## Notes

- **Uses real Google OAuth API** for authentication (external API requirement met!)
- Images are stored locally in `Backend/public/uploads/`
- User authentication persists via localStorage
- Simple, straightforward code following undergraduate project standards
- Some intentional areas for improvement (noted in TODOs)
- Protected routes require login
