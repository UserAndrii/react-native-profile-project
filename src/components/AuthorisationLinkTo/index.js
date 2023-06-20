import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AuthorisationLinkTo({ question, action, navigateTo }) {
  const navigation = useNavigation();

  return (
    <View style={styles.linkTextWrapper}>
      <Text style={styles.linkText}>{question} </Text>
      <Pressable onPress={() => navigation.navigate(navigateTo)}>
        <Text style={{ ...styles.linkText, textDecorationLine: "underline" }}>
          {action}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linkTextWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  linkText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
