import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SPACING } from '../res/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from './Button';

const numColumns = 3;

interface Entry {
  id: string;
  day: string;
  date: string;
}

const mock: Entry[] = [
  { id: '0', day: 'Sat', date: '30 May' },
  { id: '1', day: 'Sat', date: '30 May' },
  { id: '2', day: 'Sat', date: '30 May' },
  { id: '3', day: 'Sat', date: '30 May' },
  { id: '4', day: 'Sat', date: '30 May' },
  { id: '5', day: 'Sat', date: '30 May' },
  { id: '6', day: 'Mon', date: '30 May' },
  { id: '7', day: 'Sat', date: '30 May' },
  { id: '8', day: 'Sat', date: '30 May' },
  { id: '9', day: 'Sat', date: '30 May' },
  { id: '10', day: 'Sat', date: '30 May' },
  { id: '11', day: 'Sat', date: '15 May' },
  { id: '12', day: 'Sat', date: '30 June' },
  { id: '13', day: 'Sat', date: '30 May' },
  { id: '14', day: 'Sat', date: '30 May' },
  { id: '15', day: 'Sat', date: '30 May' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.m,
    paddingHorizontal: SPACING.xxs,
  },
  header: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 40,
    lineHeight: 42.5,
    textAlign: 'center',
    paddingBottom: SPACING.m,
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
    backgroundColor: '#fff',
    paddingVertical: SPACING.s,
  },
});

const cardStyleMap: any = {
  '0': styles.cardBlue,
  '1': styles.cardYellow,
  '2': styles.cardRed,
};

const VideoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Entry[]>([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState<Entry[]>([]);

  // TODO: API Call
  useEffect(() => {
    setData(mock);
    setFullData(mock);
  }, []);

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter((entry) => {
      console.log(entry);
      return contains(entry, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ day, date }: Entry, query: string) => {
    if (
      day.toLowerCase().includes(query) ||
      date.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };

  const renderHeader = () => {
    return (
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
          <Icon color={COLORS.grey} name="search" size={20}></Icon>
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          placeholder="Tags, Days, Dates..."
          onChangeText={(queryText) => handleSearch(queryText)}
          style={styles.textInput}
        />
      </View>
    );
  };

  const onPress = () => {
    alert('onPress');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Video Diary</Text>
      <FlatList
        data={data}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View
            style={[styles.card, cardStyleMap[Number(item.id) % numColumns]]}
          >
            <Text style={styles.body}>{item.day}</Text>
            <Text style={styles.body}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        stickyHeaderIndices={[0]}
      />
      <View style={{ paddingTop: SPACING.m }}>
        <Button
          title="Create Entry"
          onPress={onPress}
          backgroundColor={''}
        ></Button>
      </View>
    </View>
  );
};

export default VideoList;
