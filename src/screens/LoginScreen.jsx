import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";

import bgImage from "../images/bg-mobile-photo.jpg";

import LoginForm from "../components/LoginForm";
import ButtonFormSubmit from "../components/ButtonFormSubmit";
import AuthorisationLinkTo from "../components/AuthorisationLinkTo";

export default function LoginScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const handleChangeData = (name, value) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndRedirectToHome = () => {
    const { email, password } = currentUser;
    if (email && password) {
      console.log(currentUser);
      navigation.navigate("Home");
      return;
    }

    Toast.show({
      type: "error",
      text1: "Oops, all fields must be filled 😔",
    });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>

            <LoginForm data={currentUser} changeData={handleChangeData} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.auth}>
        <ButtonFormSubmit
          text="Увійти"
          onSubmit={() => checkAndRedirectToHome()}
        />
        <AuthorisationLinkTo
          question="Немає акаунту? "
          action="Зареєструватися"
          navigateTo="Registration"
        />
      </View>
      <View style={styles.placeholder}></View>
    </ImageBackground>
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

  container: {
    position: "relative",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },

  auth: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 144,
    zIndex: 10,
  },

  title: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 33,
  },
});
