import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SPACING } from '../res/theme';
import DescribeModal from './DescribeModal';
import VideoPreview from './VideoPreview';

export default function DescribeVideo({ route }) {
  // return with a container and VideoPreview inside
  return (
    <View style={styles.outerContainer}>
      <View style={styles.videoPreview}>
        {/* route.param.uri */}
        <VideoPreview uri={route.params.uri} />
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
