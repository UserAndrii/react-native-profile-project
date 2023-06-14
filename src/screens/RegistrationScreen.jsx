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

import RegistrationForm from "../components/RegistrationForm";
import ButtonFormSubmit from "../components/ButtonFormSubmit";
import AuthorisationLinkTo from "../components/AuthorisationLinkTo";

export default function RegistrationScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <RegistrationForm />
        </KeyboardAvoidingView>

        <ButtonFormSubmit text="Зареєстуватися" />
        <AuthorisationLinkTo question="Вже є акаунт? " action="Увійти" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: "#FFFFFF",
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
