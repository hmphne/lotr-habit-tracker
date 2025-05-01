import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HabitScreen from "../screens/HabitScreen";
import QuestScreen from "../screens/QuestScreen";
import { AuthContext } from "../utils/authProvider";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    name: "Habits",
    component: HabitScreen,
    icon: "list-outline",
  },
  {
    name: "Quests",
    component: QuestScreen,
    icon: "trophy-outline",
  },
];

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#2c2c2c" },
        tabBarActiveTintColor: "#f0c000",
        tabBarInactiveTintColor: "#aaa",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      {tabRoutes.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={WelcomeScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
