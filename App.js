import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import RegistrationScreen from './src/screens/RegistrationScreen';
import CommentsScreen from './src/screens/CommentsScreen';
import LoginScreen from './src/screens/LoginScreen';
import MapScreen from './src/screens/MapScreen';
import Header from './src/components/Header';
import Home from './src/screens/Home';

import { store } from './src/redux/store';
// import { persistor, store } from './src/redux/store';
// import { PersistGate } from 'redux-persist/integration/react';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./src/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Login"
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
          <MainStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              header: () => <Header title="Карта" />,
              headerShown: 'true',
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
      <Toast topOffset={60} />
      {/* </PersistGate> */}
    </Provider>
  );
}
