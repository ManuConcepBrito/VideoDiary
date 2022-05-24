import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackParamList } from '../../App';
import { SPACING } from '../res/theme';
import DescribeModal from './DescribeModal';
import VideoPreview from './VideoPreview';

const DescribeVideo = () => {
  const route = useRoute<RouteProp<StackParamList, 'DescribeVideo'>>();
  // return with a container and VideoPreview inside
  return (
    <View style={styles.outerContainer}>
      <View style={styles.videoPreview}>
        {/* route.param.uri */}
        <VideoPreview uri={route.params.uri} />
      </View>
      <View style={styles.describeModal}>
        {/* route.param.uri */}
        <DescribeModal uri={route.params.uri} />
      </View>
    </View>
  );
};
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

export default DescribeVideo;
