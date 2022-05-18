import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SPACING } from '../res/theme';
import Button from './Button';

const numColumns = 3;
const data = [
  { id: '0', day: 'Sat', date: '30 May' },
  { id: '1', day: 'Sat', date: '30 May' },
  { id: '2', day: 'Sat', date: '30 May' },
  { id: '3', day: 'Sat', date: '30 May' },
  { id: '4', day: 'Sat', date: '30 May' },
  { id: '5', day: 'Sat', date: '30 May' },
  { id: '6', day: 'Sat', date: '30 May' },
  { id: '7', day: 'Sat', date: '30 May' },
  { id: '8', day: 'Sat', date: '30 May' },
  { id: '9', day: 'Sat', date: '30 May' },
  { id: '10', day: 'Sat', date: '30 May' },
  { id: '11', day: 'Sat', date: '30 May' },
  { id: '12', day: 'Sat', date: '30 May' },
  { id: '13', day: 'Sat', date: '30 May' },
  { id: '14', day: 'Sat', date: '30 May' },
  { id: '15', day: 'Sat', date: '30 May' },
];

const styles = StyleSheet.create({
  container: {
    flex: 3,
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
});

const cardStyleMap: any = {
  '0': styles.cardBlue,
  '1': styles.cardYellow,
  '2': styles.cardRed,
};

function renderHeader() {
  return (
    <View
      style={{
        paddingHorizontal: SPACING.xxs,
        paddingBottom: SPACING.xxs,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 2,
          marginRight: SPACING.xxs,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={''}
          onChangeText={(queryText) => handleSearch(queryText)}
          style={{
            borderColor: COLORS.black,
            borderWidth: 3,
            backgroundColor: '#fff',
            paddingVertical: SPACING.s,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Button title="Search"></Button>
      </View>
    </View>
  );
}

const VideoList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Video Diary</Text>
      <FlatList
        data={data}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={[styles.card, cardStyleMap[item.id % numColumns]]}>
            <Text style={styles.body}>{item.day}</Text>
            <Text style={styles.body}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <View
        style={{
          backgroundColor: 'red',
          marginTop: SPACING.m,
          marginBottom: SPACING.xxs,
          paddingVertical: SPACING.xl,
        }}
      ></View>
    </View>
  );
};

export default VideoList;
