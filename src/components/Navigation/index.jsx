import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Navigation() {
  return (
    <View style={styles.nav}>
      <View style={styles.iconsNav}>
        <AntDesign name="appstore-o" size={24} color="rgba(33, 33, 33, 0.8)" />
      </View>
      <View style={styles.iconsNavFocused}>
        <AntDesign name="plus" size={24} color="#FFFFFF" />
      </View>
      <View style={styles.iconsNav}>
        <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 31,

    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    paddingTop: 9,
    width: "100%",
  },

  iconsNav: {
    padding: 8,
  },

  iconsNavFocused: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});
