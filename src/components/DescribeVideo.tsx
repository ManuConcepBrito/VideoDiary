import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../res/theme';
import DescribeModal from './DescribeModal';
import VideoPreview from './VideoPreview';

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
    paddingBottom: SPACING.m,
  },
  describeModal: {
    flex: 3,
  },
});
