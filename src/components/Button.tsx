import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING } from '../res/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor: string;
}

const Button = ({ onPress, title, backgroundColor }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.buttonText, { backgroundColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.xl + 5,
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    backgroundColor: COLORS.black,
    alignSelf: 'center',
    borderColor: COLORS.black,
    borderWidth: 3,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    elevation: 5,
    shadowRadius: 0,
  },
});

export default Button;
