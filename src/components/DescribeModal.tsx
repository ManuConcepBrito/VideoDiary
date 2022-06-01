import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import { StackParamList } from '../../App';
import { ICONS } from '../res/icons';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { DiaryStore, Entry, Mood, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';
import * as MediaLibrary from 'expo-media-library';

type DescribeModalProps = NativeStackNavigationProp<
  StackParamList,
  'DescribeVideo'
>;
type DescribeVideoProps = {
  uri: string;
};

const DescribeModal = ({ uri }: DescribeVideoProps) => {
  // return with a container and VideoPreview inside
  const navigation = useNavigation<DescribeModalProps>();
  const store = useDiaryStore();
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState<string>('');
  const [note, setNote] = React.useState<string>('');
  const [mood, setMood] = React.useState<Mood>();

  const updateTag = (input: string) => {
    const formattedTag = input.toLowerCase();
    setTagInput(formattedTag);
  };

  const saveTag = () => {
    setTags((tags) => [...tags, tagInput]);
    setTagInput('');
    Keyboard.dismiss();
  };

  const addVideo = (store: DiaryStore, uri: string) => {
    const entry: Entry = { date: new Date(), mood, note, tags, videoURI: uri };
    store.addEntry(entry);
  };

  const saveToLocalAlbum = async (videoUri) => {
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
      <Text style={styles.body}>{STRINGS.whatWasYourMoodToday}</Text>
      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => setMood(Mood.NEUTRAL)}>
          <Image style={styles.emoji} source={ICONS.neutralIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMood(Mood.SAD)}>
          <Image style={styles.emoji} source={ICONS.sadIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMood(Mood.HAPPY)}>
          <Image style={styles.emoji} source={ICONS.happyIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{STRINGS.giveItATag}</Text>
      <View style={styles.textInputContainer}>
        <BottomSheetTextInput
          value={tagInput}
          style={styles.input}
          placeholder="Keywords about today..."
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={() => Keyboard.dismiss()}
          onChangeText={(input) => updateTag(input)}
          onSubmitEditing={() => saveTag()}
          clearButtonMode="always"
        />
        <TouchableOpacity style={styles.button} onPress={() => saveTag()}>
          <Image style={styles.arrow} source={ICONS.arrow} />
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{STRINGS.notes}</Text>
      <View style={styles.notesContainer}>
        <BottomSheetTextInput
          value={note}
          placeholder="Keywords about today..."
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={() => Keyboard.dismiss()}
          onChangeText={(input) => setNote(input)}
          onSubmitEditing={() => saveTag()}
          clearButtonMode="always"
          style={styles.input}
        />
      </View>
      <View style={styles.finishButtonContainer}>
        <Button
          backgroundColor={COLORS.red}
          title="Cancel"
          onPress={() => navigation.goBack()}
        ></Button>
        <Button
          backgroundColor={COLORS.black}
          title="Finish"
          onPress={() => {
            addVideo(store, uri);
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
    flex: 1,
    paddingBottom: SPACING.l,
  },
  button: {
    padding: SPACING.s,
    backgroundColor: COLORS.blue,
    borderColor: COLORS.black,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 0.6,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: SPACING.xs,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
  },
  notesContainer: {
    marginBottom: SPACING.s,
    flex: 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  finishButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 20,
    lineHeight: 32,
  },
  emoji: {
    height: 83,
    width: 83,
  },
  arrow: {
    height: 23,
    width: 33,
  },
});

export default observer(DescribeModal);
