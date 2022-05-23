import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import { ICONS } from '../res/icons';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import Button from './Button';

const uploadVideo = (navigation) => {
  // TODO
  console.log('Uploading the video.');
  navigation.navigate('VideoList');
};

const DescribeModal = () => {
  // return with a container and VideoPreview inside
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.body}>{STRINGS.whatWasYourMoodToday}</Text>
      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => alert('You feel happy')}>
          <Image style={styles.emoji} source={ICONS.happyIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('You feel neutral')}>
          <Image style={styles.emoji} source={ICONS.neutralIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('You feel sad')}>
          <Image style={styles.emoji} source={ICONS.sadIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{STRINGS.giveItATag}</Text>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.input} placeholder="Keywords about today..." />
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('You want to add a tag')}
        >
          <Image style={styles.arrow} source={ICONS.arrow} />
        </TouchableOpacity>
      </View>
      <Text style={styles.body}>{STRINGS.notes}</Text>
      <View style={styles.notesContainer}>
        <TextInput
          style={styles.input}
          placeholder="Additional thoughts on today..."
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
          onPress={() => uploadVideo(navigation)}
        ></Button>
      </View>
    </View>
  );
};
// stylesheet for container
const styles = StyleSheet.create({
  container: {
    flex: 5,
    borderColor: COLORS.black,
    borderWidth: 5,
    margin: SPACING.m,
    padding: SPACING.s,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
  },
  button: {
    padding: SPACING.xs,
    backgroundColor: COLORS.blue,
    borderColor: COLORS.black,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 0.9,
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

export default DescribeModal;
