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
import { useDiaryStore } from '../store/DiaryStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import { Observer, observer } from 'mobx-react-lite';
import Autocomplete from './Autocomplete';

const numColumns = 3;

type VideoListProps = NativeStackNavigationProp<StackParamList, 'VideoList'>;

const VideoList = () => {
  const navigation = useNavigation<VideoListProps>();
  const [filter, setFilter] = useState<string>('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const store = useDiaryStore();

  // Autocomplete
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isSelected, setIsSelected] = useState<Boolean>(false);

  useEffect(() => {
    store.getFilteredEntries(filter.toLowerCase().trim());
    if (selectedTag === filter) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [filter]);

  const SearchTextInput = () => {
    return (
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={() => {
          store.getFilteredEntries(filter.toLowerCase().trim());
          setIsSelected(false);
        }}
        clearButtonMode="always"
        value={filter}
        placeholder="Tags, Days, Dates..."
        onSubmitEditing={() => {
          store.getFilteredEntries(filter.toLowerCase().trim());
          setIsSelected(false);
        }}
        style={styles.textInput}
        onChangeText={(text) => {
          setFilter(text.toLowerCase().trim());
        }}
      />
    );
  };
  const filterTags = () => {
    if (filter === '') {
      return [];
    }
    const filteredTags = store.tags.filter((tag) =>
      tag.toLowerCase().includes(filter.toLowerCase().trim())
    );
    if (
      filteredTags.length === 1 &&
      filteredTags[0] === filter.toLowerCase().trim()
    ) {
      return [];
    }

    console.log(filteredTags);
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
            hideResults={isSelected}
            autoCorrect={false}
            data={filterTags()}
            listContainerStyle={{
              borderWidth: 3,
              borderTopWidth: 0,
              marginBottom: 0,
              borderColor: 'black',
              zIndex: 1,
            }}
            listStyle={{ zIndex: 1 }}
            keyExtractor={(_: string, index: number) => index.toString()}
            flatListProps={{
              renderItem: (item: any) => {
                const tag = item.item;
                return (
                  <TouchableOpacity
                    style={styles.autocompleteButton}
                    onPress={() => {
                      setFilter(tag);
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
        </View>
      </View>
      <FlatList
        data={store.filteredEntries.slice()}
        renderItem={({ item }) => {
          const date = new Date(JSON.parse(item.dateString));
          return (
            <Observer>
              {() => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditVideo', { entry: item });
                  }}
                  style={[styles.card, cardStyleMap[item.mood]]}
                >
                  <Text style={styles.body}>
                    {date.toLocaleString('default', { weekday: 'short' })}
                  </Text>
                  <Text style={styles.body}>
                    {date.toLocaleString('default', { month: 'short' })}{' '}
                    {date.getDate()}
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
  autocompleteButton: {
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.xs,
  },
  autocompleteText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
});

const cardStyleMap: any = {
  Happy: styles.cardBlue,
  Neutral: styles.cardYellow,
  Sad: styles.cardRed,
};
export default observer(VideoList);
