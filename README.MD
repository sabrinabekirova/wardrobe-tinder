Wardrobe Matching React App

This is a react app that lets a user upload JPEG/ PNG images to it and then later create and save outfits. 

The Frontend employs a Vite+React Scafolding, allowing you to log in with GoogleOauth. The landing page is full of saved items that the user has created. Each button takes you to another feature while the Add Item button shows a modal to add an item and should take you back to view all of your items. You are also able to filter by category and seach for certain items in your wardrobe.

For the Backend, a Google OAuth API was used for simple log in, MYSql database running in docker to store images, users, and item ID's. These are then decoded and sent to the S3 bucket for image retrival and storage to display within the react app.