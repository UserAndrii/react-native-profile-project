import { StyleSheet, View } from "react-native";

import Header from "../components/Header";
import User from "../components/User";
import Navigation from "../components/Navigation";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Публікації" />

      <View style={styles.main}>
        <User name="Natali Romanova" email="email@example.com" />
      </View>

      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
  },

  main: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
