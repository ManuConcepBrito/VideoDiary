import React from "react";
import { StyleSheet } from "react-native";
import { useCameraDevices, Camera } from "react-native-vision-camera";

export default function CameraRN() {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return null;
  }
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
