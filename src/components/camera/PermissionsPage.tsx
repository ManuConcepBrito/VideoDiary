import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking } from 'react-native';

import { StyleSheet, View, Text, Image } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { CONTENT_SPACING, SAFE_AREA_PADDING } from './Constants';
import * as MediaLibrary from 'expo-media-library';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../App';
import { VIDEO_FOLDER_NAME } from '../../res/constants';

type PermissionsPageProps = NativeStackNavigationProp<
  StackParamList,
  'PermissionsPage'
>;

export function PermissionsPage({
  navigation,
}: PermissionsPageProps): React.ReactElement {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [mediaSavingPermissionStatus, setMediaSavingPermissionStatus] =
    useState<MediaLibrary.PermissionResponse.accessPrivileges>();
  const [mediaLibraryPermission, requestPermission] =
    MediaLibrary.usePermissions();

  const requestMicrophonePermission = useCallback(async () => {
    console.log('Requesting microphone permission...');
    const permission = await Camera.requestMicrophonePermission();
    console.log(`Microphone permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setMicrophonePermissionStatus(permission);
  }, []);

  const requestMediaSavingPermission = useCallback(async () => {
    console.log('Requesting media saving permission...');
    const permission = await requestPermission();
    console.log(`Media Saving permission status: ${permission}`);

    if (permission?.accessPrivileges !== 'all') await Linking.openSettings();
    setMediaSavingPermissionStatus(permission?.accessPrivileges);
  }, []);

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  const createVideoDiaryFolderInGallery = async () => {
    try {
      const albumExists = await MediaLibrary.getAlbumAsync(VIDEO_FOLDER_NAME);
      if (!albumExists) {
        console.log('Album does not exist, creating...');
        await MediaLibrary.createAlbumAsync(VIDEO_FOLDER_NAME);
      } else {
        console.log('Album exists, continuing...');
      }
    } catch (e) {
      console.error('Error while creating VideoDiary Folder: ', e);
    }
  };

  useEffect(() => {
    if (
      cameraPermissionStatus === 'authorized' &&
      microphonePermissionStatus === 'authorized' &&
      mediaSavingPermissionStatus === 'all'
    ) {
      createVideoDiaryFolderInGallery();
      navigation.replace('VideoList');
    }
  }, [
    cameraPermissionStatus,
    microphonePermissionStatus,
    mediaSavingPermissionStatus,
    navigation,
  ]);

  useEffect(() => {
    requestCameraPermission();
    requestMicrophonePermission();
    requestMediaSavingPermission();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...SAFE_AREA_PADDING,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});
