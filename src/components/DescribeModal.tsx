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
  Text,
  Keyboard,
} from 'react-native';
import { StackParamList } from '../../App';
import { ICONS } from '../res/icons';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { Entry, Mood, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome';
import Autocomplete from './Autocomplete';

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

  // autcomplete stuff
  const [filter, setFilter] = React.useState<string>('');
  const [hideResults, setHideResults] = React.useState<Boolean>(false);
  const [selectedTag, setSelectedTag] = React.useState<string>('');

  React.useEffect(() => {
    store.getFilteredEntries(filter.toLowerCase().trim());
    if (selectedTag === filter) {
      setHideResults(true);
    } else {
      setHideResults(false);
    }
  }, [filter]);

  const EnterTagTextInput = () => {
    return (
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
    );
  };

  const updateTag = (input: string) => {
    const formattedTag = input.toLowerCase();
    setTagInput(formattedTag);
  };

  const saveTag = () => {
    if (tagInput.trim() === '') {
      alert('Please enter a tag!');
      return;
    }
    setTags((tags) => [...tags, tagInput.trim()]);
    setTagInput('');
    Keyboard.dismiss();
  };

  const addVideo = (uri: string) => {
    const entry: Entry = { date: new Date(), mood, note, tags, videoURI: uri };
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
      <Text style={styles.body}>{STRINGS.whatWasYourMoodToday}</Text>
      <View style={styles.emojiContainer}>
        <TouchableOpacity
          style={{
            borderColor: COLORS.blue,
            borderWidth: mood === Mood.SAD ? 4 : 0,
          }}
          onPress={() => setMood(Mood.SAD)}
        >
          <Image style={styles.emoji} source={ICONS.sadIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: COLORS.blue,
            borderWidth: mood === Mood.NEUTRAL ? 4 : 0,
          }}
          onPress={() => setMood(Mood.NEUTRAL)}
        >
          <Image style={styles.emoji} source={ICONS.neutralIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: COLORS.blue,
            borderWidth: mood === Mood.HAPPY ? 4 : 0,
          }}
          onPress={() => setMood(Mood.HAPPY)}
        >
          <Image style={styles.emoji} source={ICONS.happyIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{STRINGS.giveItATag}</Text>
      <View style={styles.textInputContainer}>
        <Autocomplete
          renderTextInput={EnterTagTextInput}
          value={filter}
          hideResults={hideResults}
          autoCorrect={false}
          data={filterTags()}
          listContainerStyle={{
            borderWidth: 3,
            borderTopWidth: 0,
            marginBottom: 0,
            borderColor: 'black',
          }}
          flatListProps={{
            keyExtractor: (tag: Tag) => tag.id,
            renderItem: ({ item: { text } }: Tag) => (
              <TouchableOpacity
                style={styles.autocompleteButton}
                onPress={() => {
                  setFilter(text);
                  setSelectedTag(text);
                }}
              >
                <Text style={styles.autocompleteText}>{text}</Text>
                <Icon
                  color={COLORS.grey}
                  name="tag"
                  size={20}
                  style={{ lineHeight: 20 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Button
          style={{
            backgroundColor: COLORS.blue,
            marginLeft: SPACING.xs,
            flex: 0.2,
          }}
          onPress={() => saveTag()}
          icon={<Icon color={COLORS.white} name="arrow-right" size={20} />}
        ></Button>
      </View>
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
            flex: 0.5,
            backgroundColor: COLORS.red,
            paddingVertical: SPACING.m,
            marginRight: SPACING.s,
          }}
          title="Cancel"
          onPress={() => navigation.goBack()}
        ></Button>
        <Button
          style={{
            flex: 0.5,
            backgroundColor: COLORS.black,
            paddingVertical: SPACING.m,
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
    flex: 1,
    paddingBottom: SPACING.l,
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
    flex: 0.5,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.white,
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
