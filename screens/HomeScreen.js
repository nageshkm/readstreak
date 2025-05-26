import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MIN_GOAL = 15;
const MAX_GOAL = 180;
const STEP = 15;

export default function HomeScreen({ navigation, route }) {
  const [tempGoal, setTempGoal] = useState(MIN_GOAL);

  useEffect(() => {
    // If coming from edit, unset the goal
    if (route?.params?.editGoal) {
      resetGoal();
      navigation.setParams({ editGoal: false });
    } else {
      loadGoal();
    }
  }, [route?.params?.editGoal]);

  const loadGoal = async () => {
    const storedGoal = await AsyncStorage.getItem('daily_goal');
    if (storedGoal) {
      setTempGoal(parseInt(storedGoal));
    } else {
      setTempGoal(MIN_GOAL);
    }
  };

  const saveGoal = async (goal) => {
    await AsyncStorage.setItem('daily_goal', goal.toString());
    navigation.replace('Streak');
  };

  const incrementGoal = () => {
    setTempGoal((prev) => Math.min(prev + STEP, MAX_GOAL));
  };

  const decrementGoal = () => {
    setTempGoal((prev) => Math.max(prev - STEP, MIN_GOAL));
  };

  const resetGoal = async () => {
    await AsyncStorage.removeItem('daily_goal');
    setTempGoal(MIN_GOAL);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Reading Goal</Text>
      <View style={styles.incrementContainer}>
        <TouchableOpacity style={styles.incButton} onPress={decrementGoal}>
          <Text style={styles.incText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.goalValue}>{tempGoal} min</Text>
        <TouchableOpacity style={styles.incButton} onPress={incrementGoal}>
          <Text style={styles.incText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveGoal(tempGoal)}
      >
        <Text style={styles.saveText}>Save Goal</Text>
      </TouchableOpacity>
      <Text style={styles.quote}>
        "In my whole life, I have known no wise people who didn't read all the time — none, zero" {'\n'}-Charlie Munger
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subheader: { fontSize: 18, marginBottom: 10 },
  incrementContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  incButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  incText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  goalValue: { fontSize: 22, fontWeight: '500', minWidth: 60, textAlign: 'center' },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    minWidth: 120,
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  goalDisplay: { fontSize: 20, color: 'green', fontWeight: '500' },
  quote: {
    fontStyle: 'italic',
    fontSize: 15,
    color: '#555',
    marginTop: 18,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});