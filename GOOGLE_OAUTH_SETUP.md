# Google OAuth Setup Guide

## Steps to Get Your Google Client ID

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project
1. Click on the project dropdown at the top
2. Click "New Project"
3. Name it "Wardrobe Tinder" (or anything you want)
4. Click "Create"

### 3. Enable Google+ API
1. In the left sidebar, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

### 4. Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - Choose "External"
   - Fill in app name: "Wardrobe Tinder"
   - Add your email
   - Click "Save and Continue"
   - Skip scopes (just click "Save and Continue")
   - Add test users (your email)
   - Click "Save and Continue"

### 5. Create OAuth Client ID
1. Choose "Web application"
2. Name it "Wardrobe Tinder Web Client"
3. Add Authorized JavaScript origins:
   - `http://localhost:5173`
   - `http://localhost:3000`
4. Add Authorized redirect URIs:
   - `http://localhost:5173`
5. Click "Create"

### 6. Copy Your Client ID
1. You'll see a popup with your Client ID
2. Copy the Client ID (looks like: `123456789-abcdefg.apps.googleusercontent.com`)
3. Click "OK"

### 7. Add Client ID to Your App
1. Open `Frontend/src/App.jsx`
2. Find the line:
   ```javascript
   const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE'
   ```
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID

### 8. Test It Out
1. Start your app: `npm run dev`
2. Go to `http://localhost:5173`
3. You should see the Google login button
4. Click it and sign in with Google!

## Troubleshooting

**Error: "redirect_uri_mismatch"**
- Make sure you added `http://localhost:5173` to Authorized JavaScript origins

**Error: "Access blocked"**
- Add yourself as a test user in OAuth consent screen

**Button doesn't show up**
- Check browser console for errors
- Make sure you replaced the Client ID in App.jsx
