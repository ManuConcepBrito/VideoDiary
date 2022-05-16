import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import { useIsFocused } from "@react-navigation/native";
import Box from "../atoms/Box";
import Text from "../atoms/Text";
import { Camera } from "expo-camera";
import { palette } from "../../res/theme";

// functional componenent using expo camera
export default function CameraScreen() {
  const cameraRef = React.useRef(null);
  // track recording button state
  const [recording, setRecording] = React.useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const borderWidthAnimated = new Animated.Value(1);
  const animatedScaleStyle = {
    transform: [{ scale: borderWidthAnimated }],
  };
  React.useEffect(() => {
    (async () => {
      if (recording && !isFirstLaunch) {
        Animated.spring(borderWidthAnimated, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        let video = await cameraRef.current.recordAsync();
        console.log("video", video);
      } else if (!recording && !isFirstLaunch) {
        Animated.spring(borderWidthAnimated, {
          toValue: 0.5,
          useNativeDriver: true,
        }).start();
        cameraRef.current.stopRecording();
      } else {
        setIsFirstLaunch(false);
      }
    })();
  }),
    [recording];

  const isFocused = useIsFocused();
  if (!isFocused) {
    return null;
  }
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
            <Text variant="buttonPrimary"> Flip </Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => setRecording(!recording)}>
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
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
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
    marginLeft: 20,
  },
  // red inside square
  innerSquare: {
    backgroundColor: palette.red,
    height: 65,
    width: 65,
  },
});
