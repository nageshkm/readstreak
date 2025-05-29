import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function AuthScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleContinue = async () => {
    if (username.trim()) {
      await AsyncStorage.setItem('user_name', username.trim());
      navigation.replace('Content');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/oogway-v2.png')}
      style={styles.image}
      resizeMode="contain"
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          Hi, I'm Oogway – I've been reading for a while. What is your name?
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={60}
          style={styles.bottomContainer}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#e0d8c3"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="words"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[
                styles.expandedButton,
                { opacity: username.trim() ? 1 : 0.5 },
              ]}
              onPress={handleContinue}
              disabled={!username.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.7,
    alignSelf: 'center',
    marginTop: 100,
    marginLeft: 30,
    marginRight: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(60, 50, 30, 0.25)',
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f5e9c8',
    textAlign: 'center',
    marginBottom: 0,
    textShadowColor: 'rgba(60,40,20,0.7)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    paddingHorizontal: 24,
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 18,
    width: screenWidth * 0.8,
    marginBottom: 20,
    color: '#4d3b1f',
    fontWeight: '500',
  },
  expandedButton: {
    width: screenWidth * 0.8,
    backgroundColor: '#7b5e3b',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#f5e9c8',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});