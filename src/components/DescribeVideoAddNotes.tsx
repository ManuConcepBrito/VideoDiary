import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackParamList } from '../../App';
import { COLORS, SPACING } from '../res/theme';
import VideoPreview from './VideoPreview';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import AddNotes from './AddNotes';

const DescribeVideoAddNotes = () => {
  const route = useRoute<RouteProp<StackParamList, 'DescribeVideoAddNotes'>>();

  // variables
  const snapPoints = useMemo(() => ['10%', '70%'], []);

  // return with a container and VideoPreview inside
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        {/* route.param.uri */}
        <VideoPreview uri={route.params.uri} />
      </View>
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        style={styles.describeModal}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <AddNotes
          uri={route.params.uri}
          mood={route.params.mood}
          tags={route.params.tags}
        />
      </BottomSheet>
    </View>
  );
};
// stylesheet for container
const styles = StyleSheet.create({
  describeModal: {
    borderColor: COLORS.black,
    borderWidth: 5,
    padding: SPACING.s,
    backgroundColor: COLORS.white,
  },
});

export default DescribeVideoAddNotes;
