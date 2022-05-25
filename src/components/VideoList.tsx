import React, { useState } from 'react';
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
import { observer } from 'mobx-react-lite';

const numColumns = 3;

type VideoListProps = NativeStackNavigationProp<StackParamList, 'VideoList'>;

const VideoList = () => {
  const navigation = useNavigation<VideoListProps>();
  const [query, setQuery] = useState('');
  const store = useDiaryStore();

  const updateFilter = (filter: string) => {
    setQuery(filter);
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
            onEndEditing={() => Keyboard.dismiss()}
            clearButtonMode="always"
            value={query}
            placeholder="Tags, Days, Dates..."
            onSubmitEditing={() => {
              store.changeFilter(query);
            }}
            onChangeText={(input) => {
              updateFilter(input);
            }}
            style={styles.textInput}
          />
        </View>
      </View>
      <FlatList
        data={store.filtered}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log(item)}
            style={[
              styles.card,
              cardStyleMap[Number(item.date.getMilliseconds()) % numColumns],
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
        numColumns={numColumns}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
      <View style={{ paddingTop: SPACING.m }}>
        <Button
          title="Create Entry"
          onPress={() => navigation.navigate('CameraScreen')}
          backgroundColor={COLORS.black}
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
