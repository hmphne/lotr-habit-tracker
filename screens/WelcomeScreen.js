import { StyleSheet, View } from "react-native";
import Narrator from "../components/Narrator";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-native-paper";
import AuthForm from "../components/AuthForm";

export default function WelcomeScreen() {
  const timeoutRef = useRef(null);
  const [step, setStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const nextStepHandler = () => {
    timeoutRef.current = setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
    }, 800);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const revealScroll = () => {
    nextStepHandler();
    setShowForm(true);
  };

  const getDialogueForStep = () => {
    switch (step) {
      case 0:
        return "Welcome, traveler. The realm is in peril and we need to do something!";
      case 1:
        return "The journey ahead will be dangerous, but we must stay strong.";
      case 2:
        return "Gather your allies, for the fate of the world depends on us.";
      case 3:
        return "Let's start your adventure!";
      case 4:
        return "...";
      default:
        return "come on.";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <View
          style={[
            styles.narrator,
            {
              bottom: showForm ? 0 : "unset",
            },
          ]}
        >
          <Narrator
            triggerNextStep={step === 3 ? () => {} : nextStepHandler}
            imgSrc={require("../assets/character.jpg")}
            dialogue={getDialogueForStep()}
          />
        </View>
        {step === 3 && !showForm && (
          <Button
            mode="elevated"
            style={styles.btn}
            labelStyle={styles.btnLabel}
            contentStyle={styles.btnContent}
            onPress={revealScroll}
          >
            Reveal the scroll
          </Button>
        )}
        {showForm && <AuthForm />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6e3",
  },
  centeredContainer: {
    display: "flex",
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "auto",
  },
  narrator: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  btnLabel: {
    fontFamily: "RingBearer",
    color: "#FBC841",
    marginHorizontal: 8,
  },
  btnContent: {
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  btn: {
    backgroundColor: "#639c76",
    elevation: 10,
    borderRadius: 10,
    marginTop: 150,
  },
});
