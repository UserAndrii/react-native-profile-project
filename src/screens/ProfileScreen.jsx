import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { selectUsersPosts, selectUser } from '../redux/selectors';
import { logOut, updateAvatar } from '../redux/operations';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import Posts from '../components/Posts';
import bgImage from '../images/bg-mobile-photo.jpg';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { id, email, avatar, login } = useSelector(selectUser);
  const posts = useSelector(selectUsersPosts(email));
  const [newAvatar, setNewAvatar] = useState('');

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 2,
        });

        if (!result.canceled) {
          setNewAvatar(result.assets[0].uri);
          dispatch(updateAvatar({ id, newAvatar }));
        }
      }
    } catch (error) {
      console.log('ProfileScreen => pickImage: ', error.message);
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <Feather
            onPress={() => {
              dispatch(logOut());
            }}
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={styles.logOutIcon}
          />

          <View style={styles.avatarWrap}>
            <ImageBackground
              source={{ uri: newAvatar ? newAvatar : avatar }}
              style={styles.avatar}
            />

            <View style={styles.icon}>
              <AntDesign
                name="pluscircleo"
                size={25}
                color="#FF6C00"
                onPress={pickImage}
              />
            </View>
          </View>

          <Text style={styles.title}>{login}</Text>

          {posts?.length ? (
            posts.map(
              ({
                url,
                name,
                locationName,
                geolocation,
                likes,
                creationTime,
                comments,
                email,
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
                  email={email}
                />
              )
            )
          ) : (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>
                У вас наразі немає жодної публікації 😔
              </Text>
              <Text style={styles.text}>Хочеш спробувати?</Text>
              <Text style={styles.text}>Скоріше натискай на +</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'relative',
    flex: 1,
    marginBottom: -83,
    height: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },

  container: {
    position: 'relative',
    minHeight: Dimensions.get('window').height - 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    paddingHorizontal: 16,
    paddingVertical: 92,
    backgroundColor: '#FFFFFF',
  },

  logOutIcon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },

  avatarWrap: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',
  },

  icon: {
    position: 'absolute',
    right: -12,
    bottom: 14,

    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginBottom: 32,
  },

  textWrapper: {
    display: 'flex',
    gap: 8,
    marginTop: 32,
  },

  text: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
});
