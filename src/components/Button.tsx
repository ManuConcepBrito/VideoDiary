import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING } from '../res/theme';

const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    padding: SPACING.m,
    paddingHorizontal: SPACING.xxl,
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    backgroundColor: COLORS.black,
    alignSelf: 'center',
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
  },
});

export default Button;
