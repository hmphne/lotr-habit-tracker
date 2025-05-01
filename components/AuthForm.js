import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signIn, signUp } from "../utils/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    let response;
    if (isLogin) {
      response = await signIn(email, password);
    } else {
      response = await signUp(email, password);
    }

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      setEmail("");
      setPassword("");
      navigation.navigate("HabitScreen");
    }
  };

  return (
    <View style={styles.scrollWrapper}>
      <View style={styles.scrollBody}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#555"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? "Log In" : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? "Are you a newcomer?" : "Already done that?"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8B4513",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  scrollBody: {
    width: "90%",
    backgroundColor: "#fff8dc",
    borderWidth: 2,
    borderColor: "#a0522d",
    borderRadius: 10,
    padding: 10,
    minHeight: 250,
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 10,
  },
  submitButton: {
    backgroundColor: "#355E3B",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    width: 200,
    alignSelf: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: "#4B2E05",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 5,
  },
  switchText: {
    color: "gray",
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
    textDecorationColor: "gray",
    textDecorationLine: "underline",
  },
});
