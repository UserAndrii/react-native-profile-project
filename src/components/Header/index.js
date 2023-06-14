import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Feather name="log-out" size={24} color="#BDBDBD" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    width: "100%",
  },

  title: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.4,
    color: "#212121",
    marginBottom: 11,
  },

  icon: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
});
