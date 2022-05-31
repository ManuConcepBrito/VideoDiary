import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

import * as React from 'react';
import VideoList from './src/components/VideoList';
import CameraScreen from './src/components/CameraScreen';
import DescribeVideo from './src/components/DescribeVideo';
import { Entry } from './src/store/DiaryStore';
import EditVideo from './src/components/EditVideo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export type StackParamList = {
  VideoList: undefined;
  CameraScreen: undefined;
  DescribeVideo: { uri: string };
  EditVideo: { entry: Entry };
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
      <BottomSheetModalProvider>
        <Stack.Navigator
          initialRouteName="VideoList"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="VideoList" component={VideoList} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="DescribeVideo" component={DescribeVideo} />
          <Stack.Screen name="EditVideo" component={EditVideo} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default App;
