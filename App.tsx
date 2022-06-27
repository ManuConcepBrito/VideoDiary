import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

import React, { useEffect, useState } from 'react';
import VideoList from './src/components/VideoList';
// import CameraScreen from './src/components/CameraScreen';
import { CameraPage } from './src/components/camera/CameraScreen';
import { PermissionsPage } from './src/components/camera/PermissionsPage';
import DescribeVideo from './src/components/DescribeVideo';
import DescribeVideoAddNotes from './src/components/DescribeVideoAddNotes';
import { Entry, Mood } from './src/store/DiaryStore';
import EditVideo from './src/components/EditVideo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from 'sentry-expo';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import * as MediaLibrary from 'expo-media-library';

Sentry.init({
  dsn: 'https://ce22889f23a349a3a074aa325f901e11@o1278860.ingest.sentry.io/6478871',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export type StackParamList = {
  VideoList: undefined;
  CameraScreen: undefined;
  CameraPage: undefined;
  PermissionsPage: undefined;
  DescribeVideo: { uri: string };
  DescribeVideoAddNotes: { uri: string; mood?: Mood; tags: string[] };
  EditVideo: { entry: Entry };
};

const Stack = createNativeStackNavigator<StackParamList>();

const App = () => {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionStatus>();
  const [mediaLibraryPermission, requestPermission] =
    MediaLibrary.usePermissions();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  let [fontsLoaded] = useFonts({
    ChakraPetch_700Bold,
  });

  console.log(
    `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission} | MediaLibrary ${JSON.stringify(
      mediaLibraryPermission
    )}`
  );

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  const showPermissionsPage =
    cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined' ||
    mediaLibraryPermission?.accessPrivileges !== 'all';

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Stack.Navigator
          initialRouteName={
            showPermissionsPage ? 'PermissionsPage' : 'CameraPage'
          }
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
          <Stack.Screen name="VideoList" component={VideoList} />
          <Stack.Screen name="CameraPage" component={CameraPage} />
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
