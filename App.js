import { useFonts } from "expo-font";
import { ImageBackground, StyleSheet } from "react-native";

import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PostsScreen from "./src/screens/PostsScreen";
import bgImage from "./src/images/bg-mobile-photo.jpg";
import { useState } from "react";

export default function App() {
  const [screens, useScreens] = useState(!true);

  const [fontsLoaded] = useFonts({
    Roboto: require("./src/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      {/* {screens ? <RegistrationScreen /> : <LoginScreen />} */}
      <PostsScreen />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});
