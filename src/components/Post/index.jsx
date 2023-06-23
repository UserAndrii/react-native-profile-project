import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function Post({ photoUri, name, location, geolocation }) {
  const navigation = useNavigation();

  return (
    <View style={styles.post}>
      <ImageBackground style={styles.image} source={{ uri: photoUri }} />
      <Text style={styles.text}>{name}</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <Feather
            onPress={() => navigation.navigate('Comments')}
            name="message-circle"
            size={24}
            style={styles.icon}
          />
          <Text style={styles.postsNumber}>0</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Map', geolocation)}>
          <View style={styles.box}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 32,
  },

  image: {
    backgroundColor: '#F6F6F6',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
  },

  text: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginTop: 8,
    marginBottom: 8,
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: { display: 'flex', flexDirection: 'row', alignItems: 'center' },

  icon: { color: '#BDBDBD', marginRight: 6 },

  postsNumber: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },

  locationText: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});
