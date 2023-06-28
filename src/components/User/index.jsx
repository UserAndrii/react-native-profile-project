import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAvatar, selectEmail, selectLogin } from '../../redux/selectors';

export default function User() {
  const avatar = useSelector(selectAvatar);
  const loginName = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  return (
    <View style={styles.user}>
      <ImageBackground
        style={styles.avatar}
        source={{ uri: avatar ? avatar : null }}
      />
      <View>
        <Text style={styles.fullName}>{loginName}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',
  },

  fullName: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },

  email: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
});
