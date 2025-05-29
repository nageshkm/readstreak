// screens/OnboardingScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem('user_token', name.trim());
      navigation.replace('Content');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Text style={styles.quote}>
          “In my whole life, I have known no wise people (over a broad subject matter area) who didn't read all the time – none, zero.”
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});