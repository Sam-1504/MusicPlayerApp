import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ScrollView, View, StyleSheet, Image, TextInput } from 'react-native';

export default PlaylistsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPlaylists = async () => {
    setIsLoading(true);

    const url = `https://v1.nocodeapi.com/agrim499/spotify/bTrUSxYHmpawKGgJ/browse/featured`;
    const response = await fetch(url);
    const data = await response.json();

    setIsLoading(false);
    data.playlists.items ? setPlaylists(data.playlists.items) : setPlaylists([]);
  }

  const displayPlaylists = () => {
    // Filter playlists based on search query
    const filteredPlaylists = playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.playlistsContainer}>
        {filteredPlaylists.map((playlist, index) => (
          <TouchableOpacity
            key={'playlist-card-' + index}
            style={styles.playlistCard}
            onPress={() => { navigation.navigate('PlaylistView', { id: playlist.id }) }}
          >
            <Image source={{ uri: playlist.images[0].url }} style={{ width: '100%', height: 100, borderRadius: 5 }} />
            <Text style={{ fontWeight: 'bold' }}>{playlist.name}</Text>
            <Text>{playlist.tracks.total}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  useEffect(() => {
    fetchPlaylists();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search playlists"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {isLoading && <Text style={styles.text}>Loading Playlists.....</Text>}
      {displayPlaylists()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  playlistsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  playlistCard: {
    borderWidth: 1,
    width: '40%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  }
})
