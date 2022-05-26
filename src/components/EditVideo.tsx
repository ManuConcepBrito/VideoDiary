import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackParamList } from '../../App';
import VideoPreview from './VideoPreview';
import Button from './Button';
import { COLORS, SPACING } from '../res/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type EditVideoProps = NativeStackNavigationProp<StackParamList, 'EditVideo'>;

const EditVideo = () => {
  const route = useRoute<RouteProp<StackParamList, 'EditVideo'>>();

  const navigation = useNavigation<EditVideoProps>();
  // const entry = route.params.entry;

  // return with a container and VideoPreview inside
  return (
    <View style={styles.container}>
      <View style={styles.videoPreview}>
        {/* route.param.uri */}
        <VideoPreview uri="https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4" />
      </View>
      <View style={styles.editActions}>
        <Button
          onPress={() => navigation.goBack()}
          style={{
            flex: 0.3,
            backgroundColor: COLORS.black,
            paddingVertical: SPACING.xxs + 1,
            marginRight: SPACING.xxs,
            marginLeft: SPACING.xs,
          }}
          icon={<Icon color={COLORS.white} name="angle-left" size={30} />}
          noShadows={true}
        />
        <Button
          onPress={() => {}}
          style={{
            backgroundColor: COLORS.yellow,
            flex: 1,
            paddingVertical: SPACING.xs,
          }}
          icon={<Icon color={COLORS.white} name="edit" size={20} />}
          title="Edit Tags"
          noShadows={true}
        />
        <Button
          onPress={() => {}}
          style={{
            backgroundColor: COLORS.blue,
            flex: 1,
            paddingVertical: SPACING.xs,
            marginLeft: SPACING.xxs,
          }}
          icon={<Icon color={COLORS.white} name="edit" size={20} />}
          title="Edit Note"
          noShadows={true}
        />
        <Button
          onPress={() => {}}
          style={{
            backgroundColor: COLORS.red,
            flex: 0.3,
            paddingVertical: SPACING.xs + 3,
            paddingHorizontal: 1,
            marginRight: SPACING.xs,
            marginLeft: SPACING.xxs,
          }}
          icon={<Icon color={COLORS.white} name="trash" size={20} />}
          noShadows={true}
        />
      </View>
    </View>
  );
};
// stylesheet for container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  videoPreview: {
    flex: 1,
  },
  editActions: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.l,
  },
});

export default EditVideo;
