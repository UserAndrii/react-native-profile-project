import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyADAtMJ4MPYl_Bo_ASmLsI8gI-la3Z_lWM',
  authDomain: 'react-native-profile-project.firebaseapp.com',
  databaseURL:
    'https://react-native-profile-project-default-rtdb.firebaseio.com',
  projectId: 'react-native-profile-project',
  storageBucket: 'react-native-profile-project.appspot.com',
  messagingSenderId: '271805802278',
  appId: '1:271805802278:web:ef8891d9212e64a51103e7',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}); // +++

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
