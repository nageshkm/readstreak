import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import StreakScreen from './screens/StreakScreen';
import TimerScreen from './screens/TimerScreen';
import ContentScreen from './screens/ContentScreen';
import CommunityScreen from './screens/CommunityScreen';

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
      <Stack.Navigator initialRouteName={isSignedIn ? "Home" : "Onboarding"}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Streak" component={StreakScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Content" component={ContentScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}