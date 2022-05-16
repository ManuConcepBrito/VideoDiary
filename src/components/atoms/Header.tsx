// create a Text component that uses the Chakra Petch font
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';

export default function Header({children}) {
    let [fontsLoaded] = useFonts({
        ChakraPetch_700Bold,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ChakraPetch_700Bold',
    fontSize: 40,
  },
});