import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./utils/authProvider";
import { useFonts } from "expo-font";

export default function App() {
const [fontsLoaded] = useFonts({
  RingBearer: require("./assets/fonts/RingBearer.ttf"),
});

if (!fontsLoaded) return null;


  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
