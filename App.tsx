import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoList from './src/components/VideoList';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    ChakraPetch_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VideoList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="VideoList" component={VideoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
