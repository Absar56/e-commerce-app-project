import { Slot } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});