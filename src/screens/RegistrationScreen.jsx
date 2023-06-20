import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import bgImage from "../images/bg-mobile-photo.jpg";

import RegistrationForm from "../components/RegistrationForm";
import ButtonFormSubmit from "../components/ButtonFormSubmit";
import AuthorisationLinkTo from "../components/AuthorisationLinkTo";

export default function RegistrationScreen({ navigation }) {
  const [user, setUser] = useState({ login: "", email: "", password: "" });

  const handleChangeData = (name, value) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndRedirectToHome = () => {
    const { login, email, password } = user;
    if (login && email && password) {
      console.log(user);
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
            <ImageBackground style={styles.avatar}>
              <View style={styles.icon}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </View>

              {/* <View style={styles.icon}>
              <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
            </View> */}
            </ImageBackground>

            <Text style={styles.title}>Реєстрація</Text>

            <RegistrationForm data={user} changeData={handleChangeData} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.auth}>
        <ButtonFormSubmit
          text="Зареєстуватися"
          onSubmit={() => checkAndRedirectToHome()}
        />
        <AuthorisationLinkTo
          question="Вже є акаунт? "
          action="Увійти"
          navigateTo="Login"
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: "#FFFFFF",
  },

  auth: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 78,
    zIndex: 10,
  },

  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,

    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
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
