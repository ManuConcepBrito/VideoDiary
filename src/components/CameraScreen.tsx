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
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraRecordingOptions, CameraType } from 'expo-camera';
import { COLORS, FONTS } from '../res/theme';
import { ICONS } from '../res/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import * as MediaLibrary from 'expo-media-library';

enum CameraPermission {
  GRANTED,
  DENIED,
}

type CameraScreenProps = NativeStackNavigationProp<
  StackParamList,
  'CameraScreen'
>;

// functional componenent using expo camera
function CameraScreen() {
  const cameraRef = React.useRef<Camera>(null);
  const navigation = useNavigation<CameraScreenProps>();
  const [videoUri, setVideoUri] = React.useState<string>('');
  let [mediaLibraryPermission, requestPermission] =
    MediaLibrary.usePermissions();
  const latestRecordingValue = React.useRef(false);

  // get permissions if needed
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [type, setType] = React.useState<CameraType>(CameraType.front);

  // animations
  const scaleRedCircle = new Animated.Value(1);
  const animatedScaleStyle = {
    transform: [{ scale: scaleRedCircle }],
  };

  React.useEffect(() => {
    if (videoUri !== '') {
      navigation.navigate('DescribeVideo', {
        uri: videoUri,
      });
    }
  }, [videoUri]);

  React.useEffect(() => {
    (async () => {
      const status = await askPermissionsAsync();
      setHasPermission(status === CameraPermission.GRANTED);
    })();
  }, []);

  const onPressRecording = async () => {
    if (!latestRecordingValue.current) {
      latestRecordingValue.current = true;
      Animated.timing(scaleRedCircle, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start(({ finished }) => record(finished));
    } else {
      latestRecordingValue.current = false;
      Animated.timing(scaleRedCircle, {
        toValue: 1,
        useNativeDriver: true,
      }).start(({ finished }) => stopRecording(finished));
    }
  };

  const record = async (finished: boolean) => {
    const options: CameraRecordingOptions = {
      mirror: false,
    };

    if (
      cameraRef &&
      cameraRef.current &&
      cameraRef.current._cameraRef &&
      finished
    ) {
      const video = await cameraRef.current.recordAsync(options);
      setVideoUri(video.uri);
    }
  };

  const stopRecording = async (finished: boolean) => {
    if (
      cameraRef &&
      cameraRef.current &&
      cameraRef.current._cameraRef &&
      finished
    ) {
      cameraRef.current.stopRecording();
    }
  };

  const askPermissionsAsync = async (): Promise<CameraPermission> => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const audioPermission = await Camera.requestMicrophonePermissionsAsync();
    if (mediaLibraryPermission?.accessPrivileges !== 'all') {
      mediaLibraryPermission = await requestPermission();
    }

    // check both permissions are granted
    if (
      cameraPermission.granted &&
      audioPermission.granted &&
      mediaLibraryPermission.granted
    ) {
      return CameraPermission.GRANTED;
    } else {
      return CameraPermission.DENIED;
    }
  };

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
                type === CameraType.front ? CameraType.front : CameraType.back
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
