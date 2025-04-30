import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { signUp, signIn } from "../utils/auth"; // import the auth functions

export default function WelcomeScreen({ navigation }) {
  const [showForm, setShowForm] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  // Typewriter effect
  const fullMessage =
    "Greetings, traveler! The realm is in peril. Will you take up the quest?";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (index < fullMessage.length) {
          const next = prev + fullMessage[index];
          index++;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 30); // Typing speed
    return () => clearInterval(interval);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage(""); // Clear previous errors
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    let response;
    if (isLogin) {
      // Log in
      response = await signIn(email, password);
    } else {
      // Sign up
      response = await signUp(email, password);
    }

    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      setEmail("");
      setPassword("");
      // Navigate to HabitScreen upon successful authentication
      navigation.navigate("Habits");
    }
  };

  const handleOpenScroll = () => {
    setShowForm(true);
    Animated.timing(heightAnim, {
      toValue: 250, // adjust height based on your form
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {!showForm && (
        <TouchableOpacity style={styles.button} onPress={handleOpenScroll}>
          <Text style={styles.buttonText}>Reveal the Scroll</Text>
        </TouchableOpacity>
      )}

      <Animated.View style={[styles.scrollContainer, { height: heightAnim }]}>
        {showForm && (
          <View style={styles.scrollWrapper}>
            <View style={styles.scrollBody}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
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
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{isLogin ? "Log In" : "Sign Up"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Log In"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>

      <View style={styles.characterContainer}>
        <Image
          source={require("../assets/character.jpg")}
          style={styles.characterSmall}
        />
        <View style={styles.dialogueBubble}>
          <Text style={styles.dialogueText}>{typedText}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6e3",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: { backgroundColor: "#8B4513", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  scrollWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  scrollBody: {
    width: "90%",
    backgroundColor: "#fff8dc",
    borderWidth: 3,
    borderColor: "#a0522d",
    borderRadius: 20,
    padding: 20,
    zIndex: 0,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#355E3B",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  label: { fontSize: 12, marginBottom: 5, color: "#4B2E05" },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  // Character dialog
  characterContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    zIndex: 10,
  },
  characterSmall: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  dialogueBubble: {
    maxWidth: "70%",
    backgroundColor: "#fff8dc",
    padding: 12,
    borderRadius: 12,
    marginLeft: 10,
    borderColor: "#a0522d",
    borderWidth: 1,
  },
  dialogueText: {
    fontSize: 12,
    color: "#4B2E05",
  },
  switchText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 16,
  },
});
