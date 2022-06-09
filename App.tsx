import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

import * as React from 'react';
import VideoList from './src/components/VideoList';
import CameraScreen from './src/components/CameraScreen';
import DescribeVideo from './src/components/DescribeVideo';
import DescribeVideoAddNotes from './src/components/DescribeVideoAddNotes';
import { Entry, Mood } from './src/store/DiaryStore';
import EditVideo from './src/components/EditVideo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://ce22889f23a349a3a074aa325f901e11@o1278860.ingest.sentry.io/6478871',
  enableInExpoDevelopment: true,
  enableNative: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export type StackParamList = {
  VideoList: undefined;
  CameraScreen: undefined;
  DescribeVideo: { uri: string };
  DescribeVideoAddNotes: { uri: string; mood?: Mood; tags: string[] };
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
          <Stack.Screen
            name="DescribeVideoAddNotes"
            component={DescribeVideoAddNotes}
          />
          <Stack.Screen name="EditVideo" component={EditVideo} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default App;
