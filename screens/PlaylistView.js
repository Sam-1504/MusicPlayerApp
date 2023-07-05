import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity, Image, TextInput, Linking } from 'react-native';

export default function PlaylistView({ navigation, route }) {
  const playlistId = route.params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const fetchTracks = async () => {
    const url = `https://v1.nocodeapi.com/agrim499/spotify/bTrUSxYHmpawKGgJ/playlists?id=${playlistId}`;

    setIsLoading(true);

    const response = await fetch(url);
    const data = await response.json();

    setIsLoading(false);
    data.tracks.items ? setTracks(data.tracks.items) : setTracks([]);
  }

  const displayTracks = () => {
    // Filter tracks based on search query
    const filteredTracks = tracks.filter(track =>
      track.track.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.tracksContainer}>
        {filteredTracks.map((track, index) => (
          <TouchableOpacity
            key={'track-card-' + index}
            style={styles.trackCard}
            onPress={() => { navigation.navigate('PlayerScreen', { id: track.track.id }) }}
          >
              {/* Display songs with image and time length */}
            <Text>{index + 1}.</Text>
            <Image source={{ uri: track.track.album.images[0].url }} style={{ width: 50, height: 30, borderRadius: 3 }} />
            <View>
              <Text style={{ fontWeight: '500' }}>{track.track.name}</Text>
              <Text>{Math.floor(track.track.duration_ms / 60000)}:{Math.floor((track.track.duration_ms % 60000) / 1000)}</Text>
            </View>
            {/* ADD to favorite button */}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(track)}
            >
              <Text style={favorites.includes(track) ? styles.favoriteButtonTextActive : styles.favoriteButtonText}>
                {favorites.includes(track) ? 'Remove' : 'Add'}
              </Text>
            </TouchableOpacity>
            {/* Download button */}
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => downloadTrack(track)}
            >
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  {/* Add/Remove for favourites */}
  const toggleFavorite = (track) => {
    if (favorites.includes(track)) {
      const updatedFavorites = favorites.filter(favorite => favorite !== track);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, track];
      setFavorites(updatedFavorites);
    }
  }
  {/* Download songs offline (redirect to URL) */}
  const downloadTrack = (track) => {
    const url = track.track.preview_url;
    if (url) {
      Linking.openURL(url);
    } else {
      console.log('No preview available for download');
    }
  }

  useEffect(() => {
    fetchTracks();
  }, [])
    {/* favourites section */}
  const displayFavorites = () => {
    return (
      <View style={styles.favoritesContainer}>
        <Text style={styles.favoritesHeading}>Favorite Songs:</Text>
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <TouchableOpacity
              key={'favorite-card-' + index}
              style={styles.favoriteCard}
              onPress={() => { navigation.navigate('PlayerScreen', { id: favorite.track.id }) }}
            >
              <Text>{index + 1}.</Text>
              <Image source={{ uri: favorite.track.album.images[0].url }} style={{ width: 50, height: 30, borderRadius: 3 }} />
              <View>
                <Text style={{ fontWeight: '500' }}>{favorite.track.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(favorite)}
              >
                <Text style={styles.favoriteButtonTextActive}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => downloadTrack(favorite)}
              >
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>No favorite songs yet.</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Playlist Tracks:</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tracks"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {isLoading && <Text style={styles.text}>Loading Tracks.....</Text>}
      {displayFavorites()}
      {displayTracks()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  favoritesContainer: {
    paddingBottom: 30,
  },
  trackCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  favoriteButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  favoriteButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  favoriteButtonTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  favoritesHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  favoriteCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noFavoritesText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  downloadButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginLeft: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
