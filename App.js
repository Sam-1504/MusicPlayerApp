import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import PlaylistsScreen from './screens/PlaylistsScreen';
import PlaylistView from './screens/PlaylistView';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createNativeStackNavigator();

// This is the main component which implements navigation stack
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Music App', headerRight: () => (<Image source={{ uri: 'https://www.vaniercollege.qc.ca/wp-content/themes/vaniermain/images/logo.png' }} style={{ backgroundColor: 'red', width: 100, height: 30 }} />) }}
        />
        <Stack.Screen name="Playlists" component={PlaylistsScreen} />
        <Stack.Screen name="PlaylistView" component={PlaylistView} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;