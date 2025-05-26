import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '609187760603-8ugv2u2r9u21k0gt8l3apem7ks29an87.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'readstreak',
      useProxy: false,
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      AsyncStorage.setItem('user_token', authentication.accessToken);
      navigation.replace('Home');
    } else if (response?.type === 'error') {
      console.error('Google sign-in error:', response.error);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Reading Tracker</Text>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync({ useProxy: false })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
});