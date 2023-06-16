import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegistrationForm({
  data: { login, email, password },
  changeData,
}) {
  const [visiblePassword, useVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={
          focused === "login"
            ? { ...styles.input, ...styles.focusedInput }
            : { ...styles.input }
        }
        name="login"
        textContentType="nickname"
        placeholder="Логін"
        placeholderTextColor="#BDBDBD"
        value={login}
        onChangeText={(value) => changeData("login", value)}
        onFocus={() => setFocused("login")}
        onBlur={() => setFocused(null)}
      ></TextInput>

      <TextInput
        style={
          focused === "email"
            ? { ...styles.input, ...styles.focusedInput }
            : { ...styles.input }
        }
        name="email"
        inputMode="email"
        textContentType="emailAddress"
        placeholder="Адреса електронної пошти"
        placeholderTextColor="#BDBDBD"
        value={email}
        onChangeText={(value) => changeData("email", value)}
        onFocus={() => setFocused("email")}
        onBlur={() => setFocused(null)}
      ></TextInput>

      <View style={styles.passwordWrapper}>
        <TextInput
          style={
            focused === "password"
              ? { ...styles.input, ...styles.focusedInput }
              : { ...styles.input }
          }
          name="password"
          textContentType="password"
          secureTextEntry={visiblePassword}
          placeholder="Пароль"
          placeholderTextColor="#BDBDBD"
          value={password}
          onChangeText={(value) => changeData("password", value)}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
        ></TextInput>

        {password && (
          <Pressable
            style={styles.switch}
            onPress={() => useVisiblePassword(!visiblePassword)}
          >
            <Text>{visiblePassword ? "Показати" : "Сховати"}</Text>
          </Pressable>
        )}
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

  focusedInput: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
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
