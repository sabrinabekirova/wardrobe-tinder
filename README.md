# Wardrobe Tinder

A simple web app to organize your wardrobe digitally and create outfit combinations.

## Features

- Upload clothing items with photos
- Tag items by category (top, bottom, shoes)
- Create outfits by selecting items from each category
- Save and view outfit combinations

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL

## Setup

### Prerequisites

- Node.js installed
- Docker Desktop running
- Google Cloud account (for OAuth)

### Database Setup

1. Make sure Docker Desktop is running

2. Start MySQL using Docker:
```bash
docker-compose up -d
```

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
npm install
```

2. Start the server:
```bash
npm start
```

Backend runs on http://localhost:3000

### Frontend Setup

1. Navigate to Frontend folder:
```bash
cd Frontend
npm install
```

2. Setup Google OAuth:
   - Follow instructions in `GOOGLE_OAUTH_SETUP.md`
   - Add your Client ID to `Frontend/src/App.jsx`

3. Start the dev server:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Usage

1. Go to Upload page to add clothing items
2. Select category (top/bottom/shoes) and upload photo
3. View all items in Wardrobe page
4. Create outfits by selecting one item from each category
5. View saved outfits in Saved Outfits page

## Screenshots

![Screenshot](screenshot.png)
