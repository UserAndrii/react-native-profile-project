import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/operations';
import { selectErrorMessage } from '../redux/selectors';

import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import bgImage from '../images/bg-mobile-photo.jpg';

import RegistrationForm from '../components/RegistrationForm';
import ButtonFormSubmit from '../components/ButtonFormSubmit';
import AuthorisationLinkTo from '../components/AuthorisationLinkTo';

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  const [user, setUser] = useState({
    login: '',
    email: '',
    password: '',
    avatar: null,
  });

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [avatarLarge, setAvatarLarge] = useState(false);
  const [includeCamera, setIncludeCamera] = useState(false);

  useEffect(() => {
    try {
      // add camera & gallery
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } catch (error) {
      console.log('RegistrationScreen, CameraPermissions: ', error.message);
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return Toast.show({
      type: 'error',
      text1: `Oops, you didn't grant permission to use the camera 😔`,
    });
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setUser(prevState => ({
        ...prevState,
        avatar: uri,
      }));
      setAvatarLarge(false);
      setIncludeCamera(false);
    }
  };

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
          setUser(prevState => ({
            ...prevState,
            avatar: result.assets[0].uri,
          }));
          setAvatarLarge(false);
          setIncludeCamera(false);
        }
      }
    } catch (error) {
      console.log('registration, pickImage: ', error.message);
    }
  };

  const handleChangeData = (name, value) => {
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndRedirectToHome = () => {
    const { login, email, password } = user;
    if (login && email && password) {
      dispatch(createUser(user)).then(({ meta: { rejectedWithValue } }) => {
        if (rejectedWithValue) {
          Toast.show({
            type: 'error',
            text1: 'The data entered is incorrect',
            text2: 'The password must contain at least 6 characters',
          });
          return;
        }
      });
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Oops, all fields must be filled 😔',
    });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end', zIndex: 10 }}
        >
          <View style={styles.container}>
            <View
              style={avatarLarge ? styles.avatarWrappLarge : styles.avatarWrapp}
            >
              {includeCamera ? (
                <Camera
                  style={avatarLarge ? styles.avatarLarge : styles.avatar}
                  type={type}
                  ref={setCameraRef}
                  ratio="1:1"
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    style={{ color: '#BDBDBD', opacity: 0.8 }}
                    onPress={takePhoto}
                  />
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={24}
                    style={{
                      ...styles.flipContainer,
                      color: '#BDBDBD',
                      opacity: 0.8,
                    }}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  />
                  <MaterialIcons
                    name="insert-photo"
                    size={24}
                    style={styles.insertIcon}
                    onPress={pickImage}
                  />
                  <MaterialIcons
                    name="no-photography"
                    size={24}
                    style={styles.onBack}
                    onPress={() => {
                      setIncludeCamera(false);
                      setAvatarLarge(false);
                    }}
                  />
                  {avatarLarge ? (
                    <Ionicons
                      name="ios-contract-outline"
                      size={24}
                      style={styles.expandIcon}
                      onPress={() => setAvatarLarge(false)}
                    />
                  ) : (
                    <Ionicons
                      name="ios-expand-outline"
                      size={24}
                      style={styles.expandIcon}
                      onPress={() => setAvatarLarge(true)}
                    />
                  )}
                </Camera>
              ) : (
                <ImageBackground
                  style={styles.avatar}
                  source={{ uri: user.avatar ? user.avatar : null }}
                ></ImageBackground>
              )}

              {user.avatar === null && !includeCamera ? (
                <View style={styles.icon}>
                  <AntDesign
                    name="pluscircleo"
                    size={25}
                    color="#FF6C00"
                    onPress={() => setIncludeCamera(true)}
                  />
                </View>
              ) : null}

              {user.avatar && !includeCamera ? (
                <View style={styles.icon}>
                  <AntDesign
                    name="closecircleo"
                    size={25}
                    color="#BDBDBD"
                    onPress={() => {
                      setUser(prevState => ({
                        ...prevState,
                        avatar: null,
                      }));
                      setIncludeCamera(true);
                    }}
                  />
                </View>
              ) : null}
            </View>

            <Text style={styles.title}>Реєстрація</Text>

            <RegistrationForm data={user} changeData={handleChangeData} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.auth}>
        <ButtonFormSubmit
          text="Зареєстуватися"
          onSubmit={() => checkAndRedirectToHome()}
        />
        <AuthorisationLinkTo
          question="Вже є акаунт? "
          action="Увійти"
          navigateTo="Login"
        />
      </View>
      <View style={styles.placeholder}></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'relative',
    flex: 1,
  },

  placeholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    height: 400,
    width: '100%',
  },

  container: {
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: '#FFFFFF',
  },

  auth: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 78,
    zIndex: 10,
  },

  avatarWrapp: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
  },

  avatarWrappLarge: {
    position: 'absolute',
    top: '-65%',
    left: '25%',
  },

  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',
  },

  avatarLarge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 240,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
  },

  onPhoto: {
    color: '#BDBDBD',
    opacity: 0.8,
  },

  onBack: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#BDBDBD',
    opacity: 0.8,
  },

  flipContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
  },

  expandIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: '#BDBDBD',
  },

  insertIcon: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    color: '#BDBDBD',
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
    marginBottom: 33,
  },
});
