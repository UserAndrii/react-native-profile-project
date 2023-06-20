import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function ProfilePost() {
  return (
    <View style={styles.post}>
      <ImageBackground style={styles.image}></ImageBackground>
      <Text style={styles.text}>Ліс</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <Feather name="message-circle" size={24} style={styles.icon} />
          <Text style={{...styles.postsNumber, marginRight: 24}}>8</Text>
          <AntDesign name="like2" size={24} style={styles.icon} />
          <Text style={styles.postsNumber}>153</Text>
        </View>
        <View style={styles.box}>
          <SimpleLineIcons name="location-pin" size={24} style={styles.icon} />
          <Text style={styles.locationText}>Ukraine</Text>
        </View>
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