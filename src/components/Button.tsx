import React from 'react';
import { ReactElement } from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS } from '../res/theme';

interface ButtonProps {
  onPress: () => void;
  icon?: ReactElement<Icon>;
  title?: string;
  style?: StyleProp<ViewStyle>;
  noShadows?: boolean;
  disabled?: boolean;
}

const Button = ({
  onPress,
  title,
  icon,
  style,
  noShadows,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[style, styles.buttonStyle, noShadows ? {} : styles.shadowStyle]}
      onPress={onPress}
      disabled={disabled ? disabled : false}
    >
      <Text style={styles.buttonText}>
        {icon}
        {icon && title ? ' ' : ''}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttonStyle: {
    borderColor: COLORS.black,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowStyle: {
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowOffset: { width: 3, height: 3 },
    elevation: 5,
    shadowRadius: 0,
  },
});

export default Button;
