import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '4aa509b4e8be3f1cbd945d2913dfc425'; 

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric'
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        if (!searchHistory.includes(city)) {
          setSearchHistory([city, ...searchHistory.slice(0, 4)]);
        }
      } else {
        setWeather(null);
        Alert.alert('City not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to fetch weather data');
    }
  };

  const handleRefresh = () => {
    setCity('');
    setWeather(null);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/weather-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>🌦 Weather App</Text>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRefresh}>
            <Ionicons name="refresh-circle" size={36} color="#006064" />
          </TouchableOpacity>
        </View>

        {weather && (
          <View style={styles.resultBox}>
            <Text style={styles.weatherText}>City: {weather.name}</Text>
            <Text style={styles.weatherText}>Temperature: {weather.main.temp} °C</Text>
            <Text style={styles.weatherText}>Weather: {weather.weather[0].main}</Text>
            <Text style={styles.weatherText}>Humidity: {weather.main.humidity} %</Text>
            <Text style={styles.weatherText}>Wind: {weather.wind.speed} m/s</Text>
          </View>
        )}

        {searchHistory.length > 0 && (
          <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>Recent Searches:</Text>
            {searchHistory.map((item, index) => (
              <Text key={index} style={styles.historyItem}>• {item}</Text>
            ))}
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004d40',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#e0f2f1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#004d40',
  },
  historyBox: {
    backgroundColor: '#b2dfdb',
    padding: 15,
    borderRadius: 10,
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004d40',
  },
  historyItem: {
    color: '#004d40',
  },
});