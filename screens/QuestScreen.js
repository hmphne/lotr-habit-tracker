import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { assignQuest, getUserQuests } from '../utils/data';
import { getCurrentUser } from '../utils/auth';

export default function QuestScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [quests, setQuests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAndQuests = async () => {
      const { user, error } = await getCurrentUser();
      if (user) {
        setUser(user);
        const { data } = await getUserQuests(user.id);
        setQuests(data || []);
      } else {
        navigation.navigate('Auth');
      }
    };
    fetchUserAndQuests();
  }, [navigation]);

  const handleAssignQuest = async (questId) => {
    try {
      const { data, error } = await assignQuest(user.id, questId);
      if (error) {
        setError(error.message);
      } else {
        setQuests([...quests, data[0]]);
        setError('');
      }
    } catch (err) {
      setError('Unexpected error assigning quest.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Quests</Text>
      <Button
        mode="contained"
        onPress={() => handleAssignQuest('your-quest-id-1')} // Replace with actual quest ID
        style={styles.button}
      >
        Assign "Journey to Rivendell"
      </Button>
      <Button
        mode="contained"
        onPress={() => handleAssignQuest('your-quest-id-2')} // Replace with actual quest ID
        style={styles.button}
      >
        Assign "Bilbo’s Adventure"
      </Button>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.title}>Your Quests</Text>
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quest}>
            <Text>{item.quests.name}</Text>
            <Text>{item.quests.description}</Text>
            <Text>Progress: {item.progress.habits_completed || 0}/{item.quests.objective.count}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  button: { marginVertical: 5 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  quest: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});