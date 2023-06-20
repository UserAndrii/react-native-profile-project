import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './src/screens/RegistrationScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import LoginScreen from './src/screens/LoginScreen';
import Home from './src/screens/Home';
import Header from './src/components/Header';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./src/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Registration"
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              header: () => <Header title="Коментарі" />,
              headerShown: 'true',
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <Toast topOffset={60} />
    </>
  );
}
