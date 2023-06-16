import "react-native-gesture-handler";
import { useState } from "react";
import { useFonts } from "expo-font";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import bgImage from "./src/images/bg-mobile-photo.jpg";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";

import PostsScreen from "./src/screens/PostsScreen";

export default function App() {
  const [screens, useScreens] = useState(!true);

  const [fontsLoaded] = useFonts({
    Roboto: require("./src/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ImageBackground source={bgImage} style={styles.backgroundImage}>
        {/* <PostsScreen /> */}

        {screens ? <RegistrationScreen /> : <LoginScreen />}
        <View style={styles.placeholder}></View>
      </ImageBackground>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "relative",
    flex: 1,
  },

  placeholder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#FFFFFF",
    height: 400,
    width: "100%",
  },
});
