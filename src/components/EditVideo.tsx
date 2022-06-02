import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackParamList } from '../../App';
import VideoPreview from './VideoPreview';
import Button from './Button';
import { COLORS, SPACING } from '../res/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDiaryStore } from '../store/DiaryStore';
import { useState } from 'react';
import EditNoteModal from './EditNoteModal';
import EditTagModal from './EditTagModal';

type EditVideoProps = NativeStackNavigationProp<StackParamList, 'EditVideo'>;

const EditVideo = () => {
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const route = useRoute<RouteProp<StackParamList, 'EditVideo'>>();
  const store = useDiaryStore();
  const entry = route.params.entry;

  const navigation = useNavigation<EditVideoProps>();

  const toggleTagModal = () => {
    setTagModalVisible(!tagModalVisible);
  };

  const toggleNoteModal = () => {
    setNoteModalVisible(!noteModalVisible);
  };

  // return with a container and VideoPreview inside
  return (
    <View style={styles.container}>
      <EditNoteModal
        entry={entry}
        isVisible={noteModalVisible}
        toggleNoteModal={toggleNoteModal}
      ></EditNoteModal>
      <EditTagModal
        entry={entry}
        isVisible={tagModalVisible}
        toggleTagModal={toggleTagModal}
      ></EditTagModal>
      <View style={styles.videoPreview}>
        <VideoPreview uri={entry.videoURI} />
      </View>
      <View style={styles.editActions}>
        <Button
          onPress={navigation.goBack}
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
          onPress={toggleTagModal}
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
          onPress={toggleNoteModal}
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
          onPress={() => {
            store.removeEntry(entry);
            navigation.navigate('VideoList');
          }}
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
