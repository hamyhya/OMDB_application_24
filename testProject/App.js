import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import MovieDetails from './src/screens/MovieDetails';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      {/* <Toast/> */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Film Searcher' }} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ title: 'Movie Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
