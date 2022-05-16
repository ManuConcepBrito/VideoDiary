import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/atoms/Header';
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header>Hello bitches</Header>
    </View>
  );
}