import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '4aa509b4e8be3f1cbd945d2913dfc425';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'medium',
      });
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchWeather = async () => {
    const q = city.trim();
    if (!q) {
      alert('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        q
      )}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);

        const returnedName = data.name || q;
        const returnedLower = returnedName.toLowerCase();

        if (!searchHistory.some((s) => s.toLowerCase() === returnedLower)) {
          setSearchHistory([returnedName, ...searchHistory.slice(0, 4)]);
        }
      } else {
        setWeather(null);
        alert(data?.message ? data.message : 'City not found');
        console.debug('OpenWeather response (error):', data);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      alert('Failed to fetch weather data');
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
        <Text style={styles.dateTime}>{currentDateTime}</Text>

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
    <Text style={styles.weatherText}>
      Temperature: {Math.round(weather.main.temp)} °C
    </Text>
    <Text style={styles.weatherText}>
      Weather: {weather.weather[0].main}
    </Text>
    <Text style={styles.weatherText}>
      Humidity: {weather.main.humidity} %
    </Text>
    <Text style={styles.weatherText}>
      Wind: {weather.wind.speed.toFixed(1)} m/s
    </Text>
  </View>
)}

        {searchHistory.length > 0 && (
          <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>Recent Searches:</Text>
            {searchHistory.map((item, index) => (
              <Text key={index} style={styles.historyItem}>
                • {item}
              </Text>
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
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 17,
    color: '#004d40',
  },
  dateTime: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 21,
    color: '#006064',
    fontWeight: '500',
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