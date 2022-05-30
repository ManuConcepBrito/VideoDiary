import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ICONS } from '../res/icons';
import { COLORS, FONTS, SPACING } from '../res/theme';
import Button from './Button';

type EditTagModalProps = {
  isVisible: boolean;
  toggleTagModal: () => void;
};

const tags = [
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
  'tag',
];

const EditTagModal = ({ isVisible, toggleTagModal }: EditTagModalProps) => {
  const [note, setTag] = React.useState<string>('');

  return (
    <View>
      <Modal backdropOpacity={0.1} isVisible={isVisible}>
        <View style={styles.container}>
          <Text style={styles.body}>Moods and Tags</Text>
          <View style={styles.emojiContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image style={styles.emoji} source={ICONS.neutralIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image style={styles.emoji} source={ICONS.sadIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image style={styles.emoji} source={ICONS.happyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagListContainer}>
            <FlatList
              data={tags}
              renderItem={({ item }) => (
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={item}
                    style={styles.input}
                    placeholder={item}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onEndEditing={() => {}}
                    onChangeText={() => {}}
                    onSubmitEditing={() => {}}
                  />
                  <Button
                    onPress={() => {}}
                    style={{
                      backgroundColor: COLORS.blue,
                      flex: 0.2,
                      marginHorizontal: SPACING.s,
                    }}
                    icon={<Icon color={COLORS.white} name="edit" size={20} />}
                  />
                  <Button
                    onPress={() => {}}
                    style={{
                      backgroundColor: COLORS.red,
                      flex: 0.2,
                    }}
                    icon={<Icon color={COLORS.white} name="trash" size={20} />}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Button
            title="Finish"
            onPress={toggleTagModal}
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: SPACING.m,
              marginTop: SPACING.m,
            }}
          ></Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    shadowColor: COLORS.black,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
    borderWidth: 3,
    borderColor: COLORS.black,
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 20,
    lineHeight: 32,
  },
  input: {
    flex: 0.6,
    borderWidth: 3,
    borderColor: COLORS.black,
    paddingVertical: SPACING.xs,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: 'center',
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    shadowColor: COLORS.grey,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  emojiContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tagListContainer: {
    flex: 0.8,
    padding: SPACING.s,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
    borderWidth: 3,
    borderColor: COLORS.black,
  },
  tagListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.m,
  },
  textInputContainer: {
    flexDirection: 'row',
    flex: 0.6,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.white,
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

export default EditTagModal;
