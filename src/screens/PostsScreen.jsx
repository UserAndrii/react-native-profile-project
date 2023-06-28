import { ScrollView, StyleSheet, View } from 'react-native';

import User from '../components/User';
import Posts from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../redux/operations';
import { selectAllPosts } from '../redux/selectors';

export default function PostsScreen() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.main}>
        <User />
        {posts &&
          posts.map(
            ({
              url,
              name,
              locationName,
              geolocation,
              likes,
              creationTime,
              comments,
            }) => (
              <Posts
                key={creationTime}
                photoUri={url}
                name={name}
                location={locationName}
                likes={likes}
                geolocation={geolocation}
                id={creationTime}
                comments={comments}
              />
            )
          )}
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
