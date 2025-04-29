import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signUp, signIn } from '..//auth';

export default function TestAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await signUp(email, password);
    setMessage(error ? error.message : 'Signed up!');
  };

  const handleSignIn = async () => {
    const { data, error } = await signIn(email, password);
    setMessage(error ? error.message : 'Signed in!');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text>{message}</Text>
    </View>
  );
}