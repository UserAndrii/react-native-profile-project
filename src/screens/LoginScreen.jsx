import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import LoginForm from "../components/LoginForm";
import ButtonFormSubmit from "../components/ButtonFormSubmit";
import AuthorisationLinkTo from "../components/AuthorisationLinkTo";

export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Увійти</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <LoginForm />
        </KeyboardAvoidingView>

        <ButtonFormSubmit text="Зареєстуватися" />
        <AuthorisationLinkTo
          question="Немає акаунту? "
          action="Зареєструватися"
        />
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
    paddingTop: 32,
    paddingBottom: 144,
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
