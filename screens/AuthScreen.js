import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signIn, signUp } from '../utils/auth';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setError('');
        navigation.navigate('Habits');
      }
    } catch (err) {
      setError('Unexpected error during signup.');
    }
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        setError('');
        navigation.navigate('Habits');
      }
    } catch (err) {
      setError('Unexpected error during signin.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Sign In
      </Button>
      <Button mode="outlined" onPress={handleSignUp} style={styles.button}>
        Sign Up
      </Button>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { marginBottom: 10 },
  button: { marginVertical: 5 },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },
});