import { useState } from "react";
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
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const handleChangeData = (name, value) => {
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
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
          text="Зареєстуватися"
          onSubmit={() => console.log(currentUser)}
        />
        <AuthorisationLinkTo
          question="Немає акаунту? "
          action="Зареєструватися"
        />
      </View>
    </>
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
