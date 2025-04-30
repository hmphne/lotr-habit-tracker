import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./utils/authProvider";

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />;
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
