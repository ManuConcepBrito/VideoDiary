import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import { Entry, useDiaryStore } from '../store/DiaryStore';
import Button from './Button';

type EditNoteModalProps = {
  entry: Entry;
  isVisible: boolean;
  toggleNoteModal: () => void;
};

const EditNoteModal = ({
  entry,
  isVisible,
  toggleNoteModal,
}: EditNoteModalProps) => {
  const store = useDiaryStore();
  const [note, setNote] = React.useState<string>('');

  useEffect(() => {
    setNote(entry.note ? entry.note : '');
  }, []);

  const saveEntry = () => {
    const editedEntry: Entry = {
      ...entry,
      note,
    };
    store.removeEntry(entry);
    store.addEntry(editedEntry);
    toggleNoteModal();
  };

  return (
    <View>
      <Modal backdropOpacity={0.1} isVisible={isVisible}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={SPACING.l}
          behavior="padding"
          style={styles.container}
        >
          <Text style={styles.body}>{STRINGS.notes}</Text>
          <View style={styles.notesContainer}>
            <TextInput
              value={note}
              placeholder="Notes about today..."
              autoCapitalize="none"
              autoCorrect
              onEndEditing={() => Keyboard.dismiss()}
              onChangeText={(input) => setNote(input)}
              onSubmitEditing={() => {}}
              multiline
              blurOnSubmit
              clearButtonMode="always"
              style={styles.input}
            />
          </View>
          <Button
            title="Finish"
            onPress={saveEntry}
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: SPACING.m,
              marginVertical: SPACING.m,
              flex: 0.1,
            }}
          ></Button>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    shadowColor: COLORS.black,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0,
    elevation: 5,
    borderWidth: 3,
    borderColor: COLORS.black,
    justifyContent: 'flex-end',
  },
  body: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 20,
    lineHeight: 32,
  },
  notesContainer: {
    marginBottom: SPACING.s,
    flex: 0.9,
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
});

export default EditNoteModal;
