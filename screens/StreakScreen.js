import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StreakScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState({});
  const [dailyGoal, setDailyGoal] = useState(null);

  useEffect(() => {
    loadGoal();
    loadStreaks();
  }, []);

  const loadGoal = async () => {
    const storedGoal = await AsyncStorage.getItem('daily_goal');
    if (storedGoal) setDailyGoal(parseInt(storedGoal));
  };

  const loadStreaks = async () => {
    // Load streak data from storage and set markedDates
    // Example: { '2024-06-01': { marked: true, dotColor: 'green', selectedColor: 'green' } }
    // You need to implement logic to check if goal met for each day
  };

  return (
    <View style={styles.container}>
      <View style={styles.goalBar}>
        <Text style={styles.goalText}>
          Goal: {dailyGoal ? `${dailyGoal} min/day` : 'Not set'}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { editGoal: true })}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Reading Streak Calendar</Text>
      <Calendar
        markedDates={markedDates}
        // You can customize markingType and theme as needed
      />
      <View style={{ marginTop: 30 }}>
        <Button
          title="Start Reading"
          onPress={() => navigation.navigate('Timer')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  goalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  goalText: { fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  editText: { color: '#007AFF', fontSize: 16, textDecorationLine: 'underline' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});