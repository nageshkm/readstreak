import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import ContentScreen from './screens/ContentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const checkSignIn = async () => {
      const token = await AsyncStorage.getItem('user_token');
      setIsSignedIn(!!token);
    };
    checkSignIn();
  }, []);

  if (isSignedIn === null) return null; // or a loading spinner

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSignedIn ? "Content" : "Onboarding"}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Content" component={ContentScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}