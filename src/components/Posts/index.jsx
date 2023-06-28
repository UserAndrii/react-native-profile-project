import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { getLike } from '../../redux/operations';
import { selectEmail } from '../../redux/selectors';

export default function Posts({
  photoUri,
  name,
  location,
  likes,
  geolocation,
  id,
  comments,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);

  const addLike = () => {
    if (likes?.includes(email)) return;
    dispatch(getLike({ id, email }));
  };

  return (
    <View style={styles.post}>
      <ImageBackground
        style={styles.image}
        source={{ uri: photoUri ? photoUri : null }}
      ></ImageBackground>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <FontAwesome
            onPress={() => {
              navigation.navigate('Comments', { photoUri, id });
            }}
            name="comment"
            size={24}
            style={{
              ...styles.icon,
              color: comments?.length > 0 ? '#FF6C00' : '#BDBDBD',
            }}
          />
          <Text style={{ ...styles.postsNumber, marginRight: 24 }}>
            {comments?.length || 0}
          </Text>

          <AntDesign
            name="like2"
            size={24}
            style={{
              ...styles.icon,
              color: likes?.length > 0 ? '#FF6C00' : '#BDBDBD',
            }}
            onPress={addLike}
          />
          <Text style={styles.postsNumber}>{likes?.length ?? 0}</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Map', geolocation);
          }}
        >
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
