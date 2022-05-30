import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

import React from 'react';
import VideoList from './src/components/VideoList';
import CameraScreen from './src/components/CameraScreen';
import DescribeVideo from './src/components/DescribeVideo';
import VideoPreview from './src/components/VideoPreview';

import VideoContext, { Video } from './src/models/Videos';

const { useRealm, useQuery, RealmProvider } = VideoContext;

export type StackParamList = {
  VideoList: undefined;
  CameraScreen: undefined;
  DescribeVideo: { uri: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

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
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="DescribeVideo" component={DescribeVideo} />
        <Stack.Screen name="VideoPreview" component={VideoPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function AppWrapper() {
  if (!RealmProvider) {
    return null;
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}

export default AppWrapper;
