// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoList from './src/components/VideoList';
import HelloWorld from './src/components/atoms/HellowWorld';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/res/theme';
import {useFonts, ChakraPetch_700Bold} from '@expo-google-fonts/chakra-petch'

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    ChakraPetch_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>{
      <NavigationContainer>
        <Stack.Navigator initialRouteName="VideoList"
          screenOptions={{
          headerShown: false
          }}
        >
          <Stack.Screen name="VideoList" component={VideoList} />
          <Stack.Screen name="HelloWorld" component={HelloWorld} />
        </Stack.Navigator>
      </NavigationContainer>
    }</ThemeProvider>
  );
}

export default App;