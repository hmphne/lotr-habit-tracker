import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createHabit, getUserHabits } from '../utils/data';
import { getCurrentUser } from '../utils/auth';

export default function HabitScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAndHabits = async () => {
      const { user, error } = await getCurrentUser();
      if (user) {
        setUser(user);
        const { data } = await getUserHabits(user.id);
        setHabits(data || []);
      } else {
        navigation.navigate('Auth');
      }
    };
    fetchUserAndHabits();
  }, [navigation]);

  const handleCreateHabit = async () => {
    if (!name) {
      setError('Habit name is required');
      return;
    }
    try {
      const { data, error } = await createHabit(user.id, name, category);
      if (error) {
        setError(error.message);
      } else {
        setHabits([...habits, data[0]]);
        setName('');
        setCategory('');
        setError('');
      }
    } catch (err) {
      setError('Unexpected error creating habit.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Habit Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Category (optional)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleCreateHabit} style={styles.button}>
        Add Habit
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Quests')}
        style={styles.button}
      >
        View Quests
      </Button>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.habit}>
            {item.name} {item.category ? `(${item.category})` : ''}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { marginBottom: 10 },
  button: { marginVertical: 5 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  habit: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});