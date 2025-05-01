import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import Character from "../models/Character";
import DialogueBubble from "../components/DialogueBubble";
import { animateTiming } from "../utils/animationHelpers";
import welcomeSteps from "../narrative/welcomeSteps";

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const characterPos = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const [dialogue, setDialogue] = useState(
    ""
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const nextStep = async () => {
    const step = welcomeSteps[stepIndex];
    console.log(`Moving to step ${stepIndex}`);

    // Optional character fade out
    if (step.characterFadeOut) {
      await animateTiming(fadeAnim, 0);
    }

    // Execute step's custom logic
    if (step.onComplete) {
      await step.onComplete({
        characterPos,
        fadeAnim,
        animateTiming,
        setShowForm,
      });
    }

    // Update character position
    if (step.characterPos) {
      characterPos[0].setValue(step.characterPos[0]);
      characterPos[1].setValue(step.characterPos[1]);
    }

    // Update dialogue
    if (step.dialogue) {
      setDialogue(step.dialogue);
    }

    // Fade character back in if previously faded out
    if (step.characterFadeOut || step.characterPos) {
      await animateTiming(fadeAnim, 1);
    }

    setStepIndex(stepIndex + 1);
  };

  return (
    <View style={styles.container}>
      {/* Character will be above the dialogue */}
      <View style={styles.characterContainer}>
        <Character
          position={characterPos}
          fadeAnim={fadeAnim}
          style={styles.character}
          image={require("../assets/character.jpg")}
        />
      </View>

      {/* Dialogue Bubble */}
      <View style={styles.dialogueContainer}>
        <DialogueBubble text={dialogue} onComplete={nextStep} />
      </View>

      {/* Reveal Scroll Button */}
      {welcomeSteps[stepIndex]?.showButton && (
        <TouchableOpacity style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Reveal the Scroll</Text>
        </TouchableOpacity>
      )}

      {/* Form (appears after a certain step) */}
      {showForm && (
        <View style={styles.form}>{/* Your login/signup form here */}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fdf6e3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  characterContainer: {
    justifyContent: "center", // Centers the character vertically
    alignItems: "center", // Centers the character horizontally
    marginBottom: 50, // Reduce space between character and dialogue
  },
  dialogueContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#8B4513",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    maxWidth: 200,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    // Style your form here when revealed
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
    maxWidth: 350,
  },
});
