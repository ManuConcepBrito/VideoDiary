import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { Entry, Tag, useDiaryStore } from '../store/DiaryStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import { Observer, observer } from 'mobx-react-lite';
import Autocomplete from './Autocomplete';
import { toJS } from 'mobx';

const numColumns = 3;

const tagsTry: Tag[] = [
  {
    id: 0,
    text: 'tag',
  },
  {
    id: 1,
    text: 'better',
  },
  {
    id: 2,
    text: 'Sofya',
  },
];

type VideoListProps = NativeStackNavigationProp<StackParamList, 'VideoList'>;

const VideoList = () => {
  const navigation = useNavigation<VideoListProps>();
  const [filter, setFilter] = useState<string>('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const store = useDiaryStore();

  useEffect(() => {
    store.getFilteredEntries(filter);
  }, [filter]);

  const SearchTextInput = () => {
    return (
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={() =>
          store.getFilteredEntries(filter.toLowerCase().trim())
        }
        clearButtonMode="always"
        value={filter}
        placeholder="Tags, Days, Dates..."
        onSubmitEditing={() =>
          store.getFilteredEntries(filter.toLowerCase().trim())
        }
        style={styles.textInput}
        onChangeText={(text) => {
          setFilter(text.toLowerCase());
        }}
      />
    );
  };
  const filterTags = () => {
    if (filter === '') {
      return [];
    }
    const filteredTags = store.tags.filter((tag) =>
      tag.text.toLowerCase().includes(filter.toLowerCase().trim())
    );
    if (
      filteredTags.length === 1 &&
      filteredTags[0].text === filter.toLowerCase().trim()
    ) {
      return [];
    }
    return filteredTags;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Video Diary</Text>
      <View
        style={{
          paddingHorizontal: SPACING.xxs,
          paddingBottom: SPACING.xxs,
        }}
      >
        <View
          style={{
            position: 'absolute',
            paddingTop: SPACING.m + 2,
            paddingLeft: SPACING.m + 3,
            // for some strange reason it needs to be higher than 1
            zIndex: 2,
          }}
        >
          <Icon color={COLORS.grey} name="search" size={20} />
        </View>
        <View style={{ zIndex: 1 }}>
          <Autocomplete
            renderTextInput={SearchTextInput}
            value={filter}
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
                  style={styles.autocompleteText}
                  onPress={() => setFilter(text)}
                >
                  <Text style={styles.autocompleteText}>{text}</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </View>
      </View>
      <FlatList
        data={store.filteredEntries.slice()}
        renderItem={({ item }) => {
          return (
            <Observer>
              {() => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(`Navigating to ${item}`);
                    navigation.navigate('EditVideo', { entry: item });
                  }}
                  style={[
                    styles.card,
                    cardStyleMap[
                      Number(item.date.getMilliseconds()) % numColumns
                    ],
                  ]}
                >
                  <Text style={styles.body}>
                    {item.date.toLocaleString('default', { weekday: 'short' })}
                  </Text>
                  <Text style={styles.body}>
                    {item.date.toLocaleString('default', { month: 'short' })}{' '}
                    {item.date.getDate()}
                  </Text>
                </TouchableOpacity>
              )}
            </Observer>
          );
        }}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
      <View>
        <Button
          title="Create Entry"
          onPress={() => navigation.navigate('CameraScreen')}
          style={{
            backgroundColor: COLORS.black,
            paddingVertical: SPACING.m,
            marginHorizontal: SPACING.xxxl,
            marginVertical: SPACING.m,
          }}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.m,
    paddingHorizontal: SPACING.xxs,
  },
  header: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 40,
    lineHeight: 42.5,
    textAlign: 'center',
    paddingBottom: SPACING.s,
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 20,
    lineHeight: 32,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  card: {
    paddingLeft: SPACING.m,
    margin: SPACING.xxs,
    flex: 1,
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
    borderWidth: 3,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    aspectRatio: 1,
    justifyContent: 'center',
    maxWidth: '31%',
  },
  cardBlue: {
    backgroundColor: COLORS.blue,
  },
  cardRed: {
    backgroundColor: COLORS.red,
  },
  cardYellow: {
    backgroundColor: COLORS.yellow,
  },
  textInput: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    borderColor: COLORS.black,
    borderWidth: 3,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.s,
  },
  searchBar: {
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  autocompleteText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});

const cardStyleMap: any = {
  '0': styles.cardBlue,
  '1': styles.cardYellow,
  '2': styles.cardRed,
};
export default observer(VideoList);
