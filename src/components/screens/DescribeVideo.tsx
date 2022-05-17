import * as React from "react";
import { View, StyleSheet, Button, Text, Image } from "react-native";
import VideoPreview from "../atoms/VideoPreview";
import DescribeModal from "../atoms/DescribeModal";

export default function DescribeVideo({ navigation, route }) {
  // return with a container and VideoPreview inside
  return (
    <View style={styles.outerContainer}>
      <View style={styles.videoPreview}>
        {/* route.param.uri */}
        <VideoPreview uri="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" />
      </View>
      <View style={styles.describeModal}>
        {/* route.param.uri */}
        <DescribeModal />
      </View>
    </View>
  );
}
// stylesheet for container
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  videoPreview: {
    flex: 2,
  },
  describeModal: {
    flex: 3,
  },
});
