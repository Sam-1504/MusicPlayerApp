AGRIM DESWAL
VIPUL CHITRAL

# React Native Music Player App (Android)

This is a React Native application for playing songs and managing playlists using spotify API (using nocodeapi)

## Features

- View and browse playlists
- Search for tracks within a playlist
- Add tracks to favorites
- Remove tracks from favorites
- Download tracks (if available) -- it will redirect you to chorme from where you can download for offline use.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- React Native 
- Android Studio (for Android development)

## Getting Started

1. Clone the repository
2. Install dependencies
3. Run using powershell/ expo commads
4. Customize the API endpoint: The application uses a specific API endpoint for fetching playlists and tracks. Open the `src/screens/PlaylistView.js` and `src/screens/PlaylistsScreen.js` file and update the `url` variable in the `fetchTracks` function with your desired API endpoint.
