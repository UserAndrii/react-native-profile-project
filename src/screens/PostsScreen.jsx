import { ScrollView, StyleSheet, View } from 'react-native';

import User from '../components/User';
import Post from '../components/Post';

export default function PostsScreen({ route }) {
  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.main}>
        <User name="Natali Romanova" email="email@example.com" />
        {route.params && (
          <Post
            photoUri={route.params.photoUri}
            name={route.params.name}
            location={route.params.locationName}
            geolocation={route.params.geolocation}
          />
        )}
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
