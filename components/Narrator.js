import { Image, StyleSheet, View } from "react-native";
import DialogueBubble from "../components/DialogueBubble";

export default function Narrator({
  dialogue,
  alignSelf = "flex-start",
  imgSrc,
  triggerNextStep
}) {
  return (
    <View>
      <DialogueBubble
        text={dialogue}
        speed={40}
        pause={200}
        triggerNextStep={triggerNextStep}
      />
      <Image source={imgSrc} style={[styles.avatar, { alignSelf }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 50,
    marginVertical: 10,
  },
});
