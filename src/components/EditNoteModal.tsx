import React from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { STRINGS } from '../res/strings';
import { COLORS, FONTS, SPACING } from '../res/theme';
import Button from './Button';

type EditNoteModalProps = {
  isVisible: boolean;
  toggleNoteModal: () => void;
};

const EditNoteModal = ({ isVisible, toggleNoteModal }: EditNoteModalProps) => {
  const [note, setNote] = React.useState<string>('');

  return (
    <View>
      <Modal backdropOpacity={0.1} isVisible={isVisible}>
        <View style={styles.container}>
          <Text style={styles.body}>{STRINGS.notes}</Text>
          <View style={styles.notesContainer}>
            <TextInput
              value={note}
              placeholder="Keywords about today..."
              autoCapitalize="none"
              autoCorrect={false}
              onEndEditing={() => Keyboard.dismiss()}
              onChangeText={(input) => setNote(input)}
              onSubmitEditing={() => {}}
              clearButtonMode="always"
              style={styles.input}
            />
          </View>
          <Button
            title="Finish"
            onPress={toggleNoteModal}
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: SPACING.m,
              marginTop: SPACING.xl,
            }}
          ></Button>
        </View>
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
