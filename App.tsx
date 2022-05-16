// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoList from './src/components/VideoList';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/res/theme';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider theme={theme}>{
      <NavigationContainer>
        <Stack.Navigator initialRouteName="VideoList"
          screenOptions={{
          headerShown: false
          }}
        >
          <Stack.Screen name="VideoList" component={VideoList} />
        </Stack.Navigator>
      </NavigationContainer>
    }</ThemeProvider>
  );
}

export default App;