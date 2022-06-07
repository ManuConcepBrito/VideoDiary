import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View, StyleSheet, Text, Keyboard } from 'react-native';
import { StackParamList } from '../../App';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { Entry, Mood, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';
import * as MediaLibrary from 'expo-media-library';

type AddNotesProps = NativeStackNavigationProp<StackParamList, 'DescribeVideo'>;

type DescribeVideoProps = {
  uri: string;
  mood?: Mood;
  tags: string[];
};

const AddNotes = ({ uri, mood, tags }: DescribeVideoProps) => {
  // return with a container and VideoPreview inside
  const navigation = useNavigation<AddNotesProps>();
  const store = useDiaryStore();
  const [note, setNote] = React.useState<string>('');

  const addVideo = (uri: string) => {
    const entry: Entry = {
      dateString: JSON.stringify(new Date()),
      mood,
      note,
      tags,
      videoURI: uri,
    };
    store.addEntry(entry);
  };

  const saveToLocalAlbum = async (videoUri: string) => {
    // create asset
    const videoAsset = await MediaLibrary.createAssetAsync(videoUri);
    // check if album exists otherwise create it
    let album = await MediaLibrary.getAlbumAsync('VideoDiary');
    if (!album) {
      await MediaLibrary.createAlbumAsync('VideoDiary', videoAsset);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync(videoAsset, album);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.body}>{STRINGS.notes}</Text>
      <View style={styles.notesContainer}>
        <BottomSheetTextInput
          value={note}
          multiline
          blurOnSubmit
          placeholder="Keywords about today..."
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={() => Keyboard.dismiss()}
          onChangeText={(input) => setNote(input)}
          onSubmitEditing={() => setNote(note)}
          clearButtonMode="always"
          style={styles.input}
        />
      </View>
      <View style={styles.finishButtonContainer}>
        <Button
          style={{
            backgroundColor: COLORS.red,
            paddingVertical: SPACING.m,
            marginRight: SPACING.s,
            flex: 1,
          }}
          title="Cancel"
          onPress={() => navigation.goBack()}
        ></Button>
        <Button
          style={{
            backgroundColor: COLORS.black,
            paddingVertical: SPACING.m,
            flex: 1,
          }}
          title="Finish"
          onPress={() => {
            addVideo(uri);
            saveToLocalAlbum(uri);
            navigation.navigate('VideoList');
          }}
        ></Button>
      </View>
    </View>
  );
};

// stylesheet for container
const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.l,
    flex: 1,
    flexGrow: 1,
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: SPACING.xs,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  notesContainer: {
    flex: 2,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.red,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  finishButtonContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 20,
    lineHeight: 32,
  },
});

export default observer(AddNotes);
