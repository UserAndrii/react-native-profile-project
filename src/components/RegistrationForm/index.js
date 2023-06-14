import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegistrationForm() {
  const [visiblePassword, useVisiblePassword] = useState(true);

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        name="login"
        textContentType="nickname"
        placeholder="Логін"
        placeholderTextColor="#BDBDBD"
      ></TextInput>

      <TextInput
        style={styles.input}
        name="email"
        textContentType="emailAddress"
        placeholder="Адреса електронної пошти"
        placeholderTextColor="#BDBDBD"
      ></TextInput>

      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.input}
          name="password"
          textContentType="password"
          secureTextEntry={visiblePassword}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
        ></TextInput>

        <Pressable
          style={styles.switch}
          onPress={() => useVisiblePassword(!visiblePassword)}
        >
          <Text>{visiblePassword ? "Показати" : "Сховати"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 43,
  },

  input: {
    height: 50,
    padding: 15,

    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",

    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  passwordWrapper: {
    position: "relative",
  },

  switch: {
    position: "absolute",
    right: 16,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
