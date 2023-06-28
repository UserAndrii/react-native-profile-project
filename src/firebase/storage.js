import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const setAvatarStorage = async (avatar, uid) => {
  const storageRef = ref(storage, `avatar/${uid}.jpg`);

  const snapshot = await uploadBytes(storageRef, avatar);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

export const setPostsStorage = async (photo, uid) => {
  const storageRef = ref(storage, `posts/${uid}.jpg`);

  const snapshot = await uploadBytes(storageRef, photo);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
