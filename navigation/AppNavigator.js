import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HabitScreen from '../screens/HabitScreen';
import QuestScreen from '../screens/QuestScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Sign In' }} />
        <Stack.Screen name="Habits" component={HabitScreen} options={{ title: 'My Habits' }} />
        <Stack.Screen name="Quests" component={QuestScreen} options={{ title: 'My Quests' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}