import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../res/theme';

const RecordButton = () => {
  // track pressed state
  const [pressed, setPressed] = React.useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const borderWidthAnimated = new Animated.Value(1);
  React.useEffect(() => {
    if (pressed && !isFirstLaunch) {
      Animated.spring(borderWidthAnimated, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (!pressed && !isFirstLaunch) {
      Animated.spring(borderWidthAnimated, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start();
    } else {
      setIsFirstLaunch(false);
    }
  }),
    [pressed];
  const animatedScaleStyle = {
    transform: [{ scale: borderWidthAnimated }],
  };
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setPressed(!pressed)}>
        <View style={styles.outerSquare}>
          <Animated.View
            style={[styles.innerSquare, animatedScaleStyle]}
          ></Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// center the button in the middle of the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // white outside square
  outerSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 85,
    width: 85,
  },
  // red inside square
  innerSquare: {
    backgroundColor: COLORS.red,
    height: 65,
    width: 65,
  },
});

export default RecordButton;
