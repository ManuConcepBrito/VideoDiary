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
import { Entry, useDiaryStore } from '../store/DiaryStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import { Observer, observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const numColumns = 3;

type VideoListProps = NativeStackNavigationProp<StackParamList, 'VideoList'>;

const VideoList = () => {
  const navigation = useNavigation<VideoListProps>();
  const [filter, setFilter] = useState('');

  const [entries, setEntries] = useState<Entry[]>([]);
  const store = useDiaryStore();

  const contains = ({ date }: Entry, query: string) => {
    if (
      date
        .toLocaleString('default', { month: 'long' })
        .toLowerCase()
        .includes(query) ||
      date
        .toLocaleString('default', { weekday: 'long' })
        .toLowerCase()
        .includes(query) ||
      date.getDate().toString().includes(query)
    ) {
      return true;
    }

    return false;
  };

  const updateFilter = () => {
    const sortedData = toJS(store.entries).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    const filteredEntries = sortedData.filter((entry) => {
      return contains(entry, filter);
    });
    setEntries(filteredEntries);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const sortedData = toJS(store.entries).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
    setEntries(sortedData);
  }, []);

  useEffect(() => {
    if (filter === '') {
      const sortedData = toJS(store.entries).sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      setEntries(sortedData);
    }
  }, [filter]);

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
            zIndex: 1,
            paddingTop: SPACING.m + 2,
            paddingLeft: SPACING.m + 3,
          }}
        >
          <Icon color={COLORS.grey} name="search" size={20} />
        </View>
        <View style={styles.searchBar}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onEndEditing={() => updateFilter()}
            clearButtonMode="always"
            value={filter}
            placeholder="Tags, Days, Dates..."
            onSubmitEditing={() => updateFilter()}
            onChangeText={(text) => {
              setFilter(text.toLowerCase());
            }}
            style={styles.textInput}
          />
        </View>
      </View>
      <FlatList
        data={entries}
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
    elevation: 5,
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
});

const cardStyleMap: any = {
  '0': styles.cardBlue,
  '1': styles.cardYellow,
  '2': styles.cardRed,
};
export default observer(VideoList);
