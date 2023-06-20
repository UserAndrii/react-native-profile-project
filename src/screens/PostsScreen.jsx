import { ScrollView, StyleSheet, View } from 'react-native';
import User from '../components/User';
import Post from '../components/Post';

export default function PostsScreen() {
  return (
    <ScrollView>
      <View style={styles.main}>
        <User name="Natali Romanova" email="email@example.com" />
        <Post />
        <Post />
        <Post />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
});
