import { autorun } from 'mobx';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ICONS } from '../res/icons';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { Entry, Mood, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';

type EditTagModalProps = {
  entry: Entry;
  isVisible: boolean;
  toggleTagModal: () => void;
};

const EditTagModal = ({
  entry,
  isVisible,
  toggleTagModal,
}: EditTagModalProps) => {
  const store = useDiaryStore();
  const [tags, setTags] = useState<string[]>([]);
  const [editTags, setEditTags] = useState<string[]>([]);
  const [mood, setMood] = useState<Mood>();
  const [inputEditable, setInputEditable] = useState<boolean[]>([]);
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    setTags(entry.tags ? entry.tags : []);
    setEditTags(entry.tags ? entry.tags : []);
    setMood(entry.mood);
    const editStates = new Array(entry.tags?.length).fill(false);
    setInputEditable(editStates);
  }, []);

  const deleteTag = (i: number) => {
    const filteredTags = tags.filter((_, index) => index !== i);
    const filteredInputEditables = inputEditable.filter(
      (_, index) => index !== i
    );
    const filteredEditTags = editTags.filter((_, index) => index !== i);
    setTags(filteredTags);
    setInputEditable(filteredInputEditables);
    setEditTags(filteredEditTags);
  };

  const toggleInputEditable = (i: number) => {
    if (tags[i] === '') {
      alert('Please enter a tag!');
      return;
    }
    const toggledInputEditable = inputEditable.map((item, index) =>
      index === i ? !item : item
    );
    setInputEditable(toggledInputEditable);
  };

  const editTag = (i: number, newText: string) => {
    const editedTags = editTags.map((item, index) =>
      index === i ? newText : item
    );
    setEditTags(editedTags);
  };

  const saveTags = (i: number) => {
    setTags(editTags);
    toggleInputEditable(i);
  };

  const addTag = (tag: string) => {
    if (tag === '') {
      alert('Please enter a tag!');
      return;
    }
    setTags((tags) => [...tags, tag]);
    setEditTags((editTags) => [...editTags, tag]);
    setInputEditable((inputEditable) => [...inputEditable, false]);
    setNewTag('');
    Keyboard.dismiss();
  };

  const saveEntry = () => {
    const editedEntry: Entry = {
      ...entry,
      mood,
      tags,
    };
    store.removeEntry(entry);
    store.addEntry(editedEntry);
    toggleTagModal();
  };

  return (
    <View>
      <Modal backdropOpacity={0.1} isVisible={isVisible}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={SPACING.l}
          behavior="padding"
          style={styles.container}
        >
          <Text style={styles.body}>Moods and Tags</Text>
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
          <View style={styles.tagListContainer}>
            <FlatList
              keyboardShouldPersistTaps={'always'}
              key={'key'}
              keyExtractor={(item) => '' + item}
              data={tags}
              renderItem={({ item, index }) => (
                <>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      value={editTags[index]}
                      style={[
                        styles.input,
                        {
                          color: inputEditable[index]
                            ? COLORS.black
                            : COLORS.grey,
                        },
                      ]}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={inputEditable[index]}
                      onChangeText={(newText) => editTag(index, newText)}
                      onSubmitEditing={() => saveTags(index)}
                      onEndEditing={() => saveTags(index)}
                    />
                    <Button
                      onPress={() => saveTags(index)}
                      style={{
                        backgroundColor: inputEditable[index]
                          ? item === ''
                            ? COLORS.grey
                            : COLORS.green
                          : COLORS.blue,
                        flex: 0.2,
                        marginHorizontal: SPACING.s,
                      }}
                      icon={
                        <Icon
                          color={COLORS.white}
                          name={inputEditable[index] ? 'check' : 'edit'}
                          size={20}
                        />
                      }
                    />
                    <Button
                      onPress={() => deleteTag(index)}
                      style={{
                        backgroundColor: COLORS.red,
                        flex: 0.2,
                      }}
                      icon={
                        <Icon color={COLORS.white} name="trash" size={20} />
                      }
                    />
                  </View>
                </>
              )}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end' }}
              ListFooterComponent={
                <View style={styles.textInputContainer}>
                  <TextInput
                    value={newTag}
                    style={[
                      styles.input,
                      {
                        color: newTag === '' ? COLORS.grey : COLORS.black,
                      },
                    ]}
                    placeholder="Add new tag"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(newText) => setNewTag(newText)}
                    onSubmitEditing={() => addTag(newTag)}
                  />
                  <Button
                    onPress={() => {
                      newTag === ''
                        ? alert('Please enter a tag!')
                        : addTag(newTag);
                    }}
                    style={{
                      backgroundColor:
                        newTag === '' ? COLORS.grey : COLORS.green,
                      flex: 0.4,
                      marginLeft: SPACING.s,
                    }}
                    icon={<Icon color={COLORS.white} name="plus" size={20} />}
                  />
                </View>
              }
            />
          </View>

          <Button
            title="Finish"
            onPress={saveEntry}
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: SPACING.m,
              marginVertical: SPACING.m,
            }}
          ></Button>
        </KeyboardAvoidingView>
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
    justifyContent: 'flex-end',
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
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: SPACING.xl,
  },
  tagListContainer: {
    flex: 0.9,
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
});

export default EditTagModal;
