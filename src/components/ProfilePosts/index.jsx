import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProfilePost() {
  const [like, setLike] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.post}>
      <ImageBackground style={styles.image}></ImageBackground>
      <Text style={styles.text}>Ліс</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <FontAwesome
            onPress={() => {
              navigation.navigate('Comments');
            }}
            name="comment"
            size={24}
            style={{ ...styles.icon, color: 8 > 0 ? '#FF6C00' : '#BDBDBD' }}
          />
          <Text style={{ ...styles.postsNumber, marginRight: 24 }}>8</Text>

          <AntDesign
            name="like2"
            size={24}
            style={{ ...styles.icon, color: like > 0 ? '#FF6C00' : '#BDBDBD' }}
            onPress={() => setLike(prev => prev + 1)}
          />
          <Text style={styles.postsNumber}>{like}</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Map');
          }}
        >
          <View style={styles.box}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.locationText}>Ukraine</Text>
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
    color: '#212121',
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
