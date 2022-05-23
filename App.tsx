import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

import React from 'react';
import VideoList from './src/components/VideoList';
import RecordButton from './src/components/RecordButton';
import VideoPreview from './src/components/VideoPreview';
import CameraScreen from './src/components/CameraScreen';
import DescribeVideo from './src/components/DescribeVideo';

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
        <Stack.Screen name="RecordButton" component={RecordButton} />
        <Stack.Screen name="VideoPreview" component={VideoPreview} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="DescribeVideo" component={DescribeVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
