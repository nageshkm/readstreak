import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function TimerScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Optionally, enable DND mode here

  const stopTimer = () => {
    setRunning(false);
    // Save the reading time for today in AsyncStorage
    // Optionally, disable DND mode here
    navigation.goBack();
  };

  // Reset timer at midnight (implement logic as needed)

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{Math.floor(seconds / 60)}:{('0' + (seconds % 60)).slice(-2)}</Text>
      <Button title="Stop" onPress={stopTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 48, fontWeight: 'bold', marginBottom: 30 },
});