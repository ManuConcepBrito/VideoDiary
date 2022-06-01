import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Camera, CameraRecordingOptions } from 'expo-camera';
import { COLORS, FONTS } from '../res/theme';
import { ICONS } from '../res/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import * as MediaLibrary from 'expo-media-library';

type CameraScreenProps = NativeStackNavigationProp<
  StackParamList,
  'CameraScreen'
>;

// functional componenent using expo camera
function CameraScreen() {
  const cameraRef = React.useRef(null);
  const options: CameraRecordingOptions = {
    mirror: false,
  };
  const navigation = useNavigation<CameraScreenProps>();
  const [videoUri, setVideoUri] = React.useState(null);
  // track recording button state
  const [recording, setRecording] = React.useState(false);
  const latestRecordingValue = React.useRef(false);
  const scaleRedCircle = new Animated.Value(1);
  const animatedScaleStyle = {
    transform: [{ scale: scaleRedCircle }],
  };
  // navigate when videoUri is set
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (videoUri !== null) {
      navigation.navigate('DescribeVideo', { uri: videoUri });
    }
  }, [videoUri]);

  const onPressRecording = () => {
    if (!latestRecordingValue.current) {
      latestRecordingValue.current = true;
      Animated.spring(scaleRedCircle, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start(({ finished }) => record(finished));
    } else {
      latestRecordingValue.current = false;
      Animated.spring(scaleRedCircle, {
        toValue: 1,
        useNativeDriver: true,
      }).start(({ finished }) => stopRecording(finished));
    }
  };

  const record = async (finished) => {
    if (finished) {
      const video = await cameraRef.current.recordAsync(options);
      setVideoUri(video.uri);
    }
  };

  const stopRecording = async (finished) => {
    if (finished) {
      cameraRef.current.stopRecording();
    }
  };

  // const isFocused = useIsFocused();
  // if (!isFocused) {
  //   return null;
  // }
  // get permissions if needed
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.front);

  const askPermissionsAsync = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const audioPermission = await Camera.requestMicrophonePermissionsAsync();
    let savingPermission = await MediaLibrary.getPermissionsAsync();
    if (savingPermission.accessPrivileges !== 'all') {
      savingPermission = await MediaLibrary.requestPermissionsAsync();
    }

    // check both permissions are granted
    if (
      cameraPermission.status === 'granted' &&
      audioPermission.status === 'granted'
    ) {
      return 'granted';
    } else {
      return 'denied';
    }
  };

  React.useEffect(() => {
    (async () => {
      const status = await askPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.body}></Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Image source={ICONS.reverse} />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={onPressRecording}>
            <View style={styles.outerSquare}>
              <Animated.View
                style={[styles.innerSquare, animatedScaleStyle]}
              ></Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    height: 42,
    width: 53,
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 20,
    lineHeight: 32,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  // white outside square
  outerSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 85,
    width: 85,
    margin: 10,
  },
  // red inside square
  innerSquare: {
    backgroundColor: COLORS.red,
    height: 65,
    width: 65,
  },
});

export default CameraScreen;
