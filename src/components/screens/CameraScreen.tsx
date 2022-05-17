import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Permissions from "expo-permissions";
import { useIsFocused } from "@react-navigation/native";
import Box from "../atoms/Box";
import Text from "../atoms/Text";
import { Camera } from "expo-camera";
import { palette } from "../../res/theme";
import icons from "../../res/icons";

// functional componenent using expo camera
export default function CameraScreen({ navigation }) {
  const cameraRef = React.useRef(null);
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
      console.log(videoUri);
      navigation.navigate("VideoPreview", { uri: videoUri });
    }
  }, [videoUri]);

  const onPressRecording = () => {
    console.log("latest recording value", latestRecordingValue.current);
    if (!latestRecordingValue.current) {
      latestRecordingValue.current = true;
      console.log("Starting animation");
      Animated.spring(scaleRedCircle, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start(({ finished }) => record(finished));
    } else {
      console.log("Finishing animation");
      latestRecordingValue.current = false;
      Animated.spring(scaleRedCircle, {
        toValue: 1,
        useNativeDriver: true,
      }).start(({ finished }) => stopRecording(finished));
    }
  };

  const record = async (finished) => {
    console.log("Finished:", finished);
    if (finished) {
      console.log("Starting recording");
      const video = await cameraRef.current.recordAsync({
        quality: Camera.Constants.VideoQuality["1080p"],
      });
      setVideoUri(video.uri);
    }
  };

  const stopRecording = async (finished) => {
    console.log("Finished Stop Recording:", finished);
    if (finished) {
      console.log("Stopping recording");
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
    console.log("cameraPermission", cameraPermission);
    console.log("audioPermission", audioPermission);

    // check both permissions are granted
    if (
      cameraPermission.status === "granted" &&
      audioPermission.status === "granted"
    ) {
      return "granted";
    } else {
      return "denied";
    }
  };

  React.useEffect(() => {
    (async () => {
      const status = await askPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Box />;
  }
  if (hasPermission === false) {
    return <Text variant="buttonPrimary">No access to camera</Text>;
  }

  return (
    <Box style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <Box style={styles.buttonContainer}>
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
            <Image source={icons.reverse} />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={onPressRecording}>
            <Box style={styles.outerSquare}>
              <Animated.View
                style={[styles.innerSquare, animatedScaleStyle]}
              ></Animated.View>
            </Box>
          </TouchableWithoutFeedback>
        </Box>
      </Camera>
    </Box>
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
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 10,
    height: 42,
    width: 53,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  // white outside square
  outerSquare: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.white,
    height: 85,
    width: 85,
    margin: 10,
  },
  // red inside square
  innerSquare: {
    backgroundColor: palette.red,
    height: 65,
    width: 65,
  },
});
