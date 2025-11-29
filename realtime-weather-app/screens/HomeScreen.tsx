import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function HomeScreen() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/sky_bg.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.date}>
          {dateTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
        <Text style={styles.time}>
          {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  time: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  }
});