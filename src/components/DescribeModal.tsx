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
import { Mood, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';
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

  // autocomplete
  const [selectedTag, setSelectedTag] = React.useState<string>('');
  const [isSelected, setIsSelected] = React.useState<Boolean>(false);
  const [isFocused, setIsFocused] = React.useState<Boolean>(false);

  React.useEffect(() => {
    store.getFilteredEntries(tagInput.toLowerCase().trim());
    console.log('isSelected', isSelected);
    if ((selectedTag !== '' || tagInput !== '') && selectedTag === tagInput) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [tagInput]);

  const EnterTagTextInput = () => {
    return (
      <BottomSheetTextInput
        value={tagInput}
        style={[styles.tagInput]}
        placeholder="Keywords about today..."
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={() => {
          Keyboard.dismiss();
          setIsSelected(false);
        }}
        onChangeText={(input) => updateTag(input)}
        onSubmitEditing={() => {
          saveTag();
          setIsSelected(false);
        }}
        clearButtonMode="always"
      />
    );
  };

  const filterTags = () => {
    if (tagInput === '') {
      return [];
    }
    const filteredTags = store.tags.filter((tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase().trim())
    );
    if (
      filteredTags.length === 1 &&
      filteredTags[0] === tagInput.toLowerCase().trim()
    ) {
      return [];
    }
    return filteredTags;
  };

  const updateTag = (input: string) => {
    const formattedTag = input.toLowerCase().trim();
    setTagInput(formattedTag);
  };

  const saveTag = () => {
    if (tagInput.trim() === '') {
      alert('Please enter a tag!');
      return;
    }
    console.log('Saving tag', tagInput);
    setTags((tags) => [...tags, tagInput.trim()]);
    setTagInput('');
    Keyboard.dismiss();
  };

  const navigateToSecondDescribePage = () => {
    if (typeof mood === 'undefined') {
      alert('Please enter your mood!');
      return;
    }
    // do not use saveTag as that's async and it will not save the tag
    if (tagInput !== '') {
      navigation.navigate('DescribeVideoAddNotes', {
        uri: uri,
        mood: mood,
        tags: [...tags, tagInput.trim()],
      });
    } else {
      navigation.navigate('DescribeVideoAddNotes', {
        uri: uri,
        mood: mood,
        tags: tags,
      });
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
      <View>
        <Text style={styles.body}>{STRINGS.giveItATag}</Text>
        <View style={styles.textInputContainer}>
          <Autocomplete
            renderTextInput={EnterTagTextInput}
            value={tagInput}
            hideResults={isSelected}
            autoCorrect={false}
            data={filterTags()}
            listContainerStyle={{
              borderWidth: 3,
              borderTopWidth: 0,
              marginBottom: 0,
              borderColor: 'black',
            }}
            keyExtractor={(_: string, index: number) => index.toString()}
            flatListProps={{
              renderItem: (item: any) => {
                const tag = item.item;
                return (
                  <TouchableOpacity
                    style={styles.autocompleteButton}
                    onPress={() => {
                      updateTag(tag);
                      setSelectedTag(tag);
                      setIsSelected(true);
                    }}
                  >
                    <Text style={styles.autocompleteText}>{tag}</Text>
                    <Icon
                      color={COLORS.grey}
                      name="tag"
                      size={20}
                      style={{ lineHeight: 20 }}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
          <Button
            style={{
              backgroundColor: COLORS.blue,
              marginLeft: SPACING.xs,
              zIndex: 1,
              flex: 1,
              height: 50,
            }}
            onPress={() => saveTag()}
            icon={<Icon color={COLORS.white} name="arrow-right" size={20} />}
          ></Button>
        </View>
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
            backgroundColor: COLORS.yellow,
            paddingVertical: SPACING.m,
            flex: 1,
          }}
          title="Next"
          onPress={() => {
            navigateToSecondDescribePage();
          }}
        ></Button>
      </View>
    </View>
  );
};

// stylesheet for container
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.s,
    backgroundColor: COLORS.white,
  },
  tagInput: {
    minWidth: '80%',
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
  arrowButton: {
    minWidth: '20%',
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
  emoji: {
    height: 83,
    width: 83,
  },
  arrow: {
    height: 23,
    width: 33,
  },
  autocompleteButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.xs,
  },
  autocompleteText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});

export default observer(DescribeModal);
