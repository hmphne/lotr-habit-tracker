import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DialogueBubble({ text, onComplete }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (i < text.length) {
          const next = prev + text[i];
          i++;
          return next;
        } else {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }
      });
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

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
    maxWidth: "90%",
  },
  dialogueText: {
    fontSize: 14,
    color: "#4B2E05",
  },
});
