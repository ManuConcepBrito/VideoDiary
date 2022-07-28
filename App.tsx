import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';
import { Platform } from 'react-native';

import React, { useEffect, useState } from 'react';
import VideoList from './src/components/VideoList';
import { CameraPage } from './src/components/camera/CameraScreen';
import { PermissionsPage } from './src/components/camera/PermissionsPage';
import DescribeVideo from './src/components/DescribeVideo';
import DescribeVideoAddNotes from './src/components/DescribeVideoAddNotes';
import { Entry, Mood } from './src/store/DiaryStore';
import EditVideo from './src/components/EditVideo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Sentry from 'sentry-expo';
import * as Notifications from 'expo-notifications';
import { EXPERIENCE_ID } from './src/res/constants';
import { AirtableBase } from './src/api/Airtable';

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
  // push notifications
  const [pushNotificationPermission, setPushNotificationPermission] =
    useState<Notifications.NotificationPermissionsStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);

    // check if user has been asked for push notifications
    Notifications.getPermissionsAsync().then(setPushNotificationPermission);
  }, []);

  useEffect(() => {
    if (pushNotificationPermission?.status === 'granted') {
      Notifications.getExpoPushTokenAsync({
        experienceId: EXPERIENCE_ID,
      }).then((res) => {
        const token = res.data;
        console.log('Push notification token: ', token);
        AirtableBase('user')
          .select({
            filterByFormula: `{push_token} = "${token}"`,
          })
          .firstPage(function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            if (records?.length === 0) {
              // there's not a record in our airtable therefore we push a new one
              console.log("THERE'S NOT A RECORD");
              AirtableBase('user').create(
                {
                  push_token: token,
                  status: 'AUTHORIZED',
                },
                function (err, record) {
                  if (err) {
                    console.error(
                      'Error while uploading token to airtable: ',
                      err
                    );
                    return;
                  }
                  console.log(record?.getId());
                }
              );
            } else {
              console.log("There's already an user with this token");
            }
            return;
          });
      });
    }
  }, [pushNotificationPermission]);

  let [fontsLoaded] = useFonts({
    ChakraPetch_700Bold,
  });

  console.log(
    `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission} | MediaLibrary ${JSON.stringify(
      mediaLibraryPermission
    )} | PushNotification: ${pushNotificationPermission?.status}`
  );

  if (
    cameraPermission == null ||
    microphonePermission == null ||
    pushNotificationPermission == null
  ) {
    // still loading
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  const showPermissionsPage =
    cameraPermission !== 'authorized' ||
    microphonePermission === 'not-determined' ||
    mediaLibraryPermission?.accessPrivileges !== 'all' ||
    pushNotificationPermission == null ||
    pushNotificationPermission.ios?.status ===
      Notifications.IosAuthorizationStatus.NOT_DETERMINED;

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Stack.Navigator
          initialRouteName={
            showPermissionsPage ? 'PermissionsPage' : 'VideoList'
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
