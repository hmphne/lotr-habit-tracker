import { StyleSheet, Text, View } from "react-native";
import { useTypewriter } from "../hooks/useTypewriter";
import { useEffect } from "react";

export default function DialogueBubble({
  text,
  speed,
  pause,
  triggerNextStep,
}) {
  const { typedText, finished } = useTypewriter(text, speed, pause);

  useEffect(() => {
    if (finished) {
      triggerNextStep();
    }
  }, [finished]);

  return (
    <View style={styles.dialogueBubble}>
      <Text style={styles.dialogueText}>{typedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dialogueBubble: {
    backgroundColor: "#fff8dc",
    padding: 12,
    borderRadius: 12,
    borderColor: "#a0522d",
    borderWidth: 1,
    width: 250,
    maxWidth: "90%",
    alignSelf: "flex-start",
  },
  dialogueText: {
    fontSize: 14,
    color: "#4B2E05",
    textAlign: "left",
  },
});
