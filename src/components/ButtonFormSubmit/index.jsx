import { Pressable, StyleSheet, Text } from "react-native";

export default function ButtonFormSubmit({ text, onSubmit }) {
  return (
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  btnText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
