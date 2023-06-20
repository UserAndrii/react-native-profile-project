import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import bgImage from '../images/bg-mobile-photo.jpg';
import ProfilePost from '../components/ProfilePosts';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <Feather
            onPress={() => {
              navigation.navigate('Login');
            }}
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={styles.logOutIcon}
          />

          <ImageBackground style={styles.avatar}>
            <View style={styles.icon}>
              <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
            </View>
            {/* <View style={styles.icon}>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
            </View> */}
          </ImageBackground>

          <Text style={styles.title}>Natali Romanova</Text>

          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
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

  avatar: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
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
});
