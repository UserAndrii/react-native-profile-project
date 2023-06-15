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

import RegistrationForm from "../components/RegistrationForm";
import ButtonFormSubmit from "../components/ButtonFormSubmit";
import AuthorisationLinkTo from "../components/AuthorisationLinkTo";

export default function RegistrationScreen() {
  const [user, setUser] = useState({ login: "", email: "", password: "" });

  const handleChangeData = (name, value) => {
    setUser((prevState) => ({
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
          onSubmit={() => console.log(user)}
        />
        <AuthorisationLinkTo question="Вже є акаунт? " action="Увійти" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
