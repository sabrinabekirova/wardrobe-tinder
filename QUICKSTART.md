# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Start Database
```bash
# Make sure Docker Desktop is running first!
docker-compose up -d
```

### Step 2: Setup Google OAuth
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth client ID
5. Copy your Client ID
6. Paste it in `Frontend/src/App.jsx` (line 13)

**See `GOOGLE_OAUTH_SETUP.md` for detailed steps**

### Step 3: Start Backend
```bash
cd Backend
npm install
npm start
```
Backend runs on http://localhost:3000

### Step 4: Start Frontend
Open a new terminal:
```bash
cd Frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

### Step 5: Use the App!
1. Open http://localhost:5173
2. Login with Google
3. Upload clothing items
4. Create outfits
5. View saved outfits

## 📸 Don't Forget!
- Take a screenshot for your submission
- Save it as `screenshot.png` in the root folder

## 🌐 Deploy to AWS
Follow `DEPLOYMENT.md` for AWS deployment instructions

## ❓ Troubleshooting

**Database won't start?**
- Make sure Docker Desktop is running

**Google login doesn't work?**
- Check you added your Client ID to App.jsx
- Make sure you added localhost:5173 to authorized origins

**Images won't upload?**
- Check `Backend/public/uploads/` folder exists
- Backend should be running on port 3000

**Can't see uploaded items?**
- Check backend console for database connection errors
- Try refreshing the page
