import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './config';

export const rejecterUser = async ({ email, url, login, id }) => {
  try {
    await setDoc(doc(db, 'user', id), {
      login,
      email,
      url,
    });
  } catch (error) {
    console.log('rejecterUser: ', error.message);
  }
};

export const setCurrentUser = async id => {
  try {
    const user = await getDoc(doc(db, 'user', id));

    if (user.exists()) {
      return user.data();
    }
  } catch (error) {
    console.log('setCurrentUser: No such document! ', error.message);
  }
};

export const updateUserAvatar = async (id, newAvatar) => {
  try {
    await updateDoc(doc(db, 'user', `${id}`), {
      url: newAvatar,
    });
  } catch (error) {
    console.log('updateUserAvatar: ', error.message);
  }
};

export const createPosts = async ({
  url,
  name,
  locationName,
  geolocation,
  creationTime,
  email,
}) => {
  try {
    const post = await setDoc(doc(db, 'posts', `${creationTime}`), {
      url,
      name,
      locationName,
      geolocation,
      creationTime,
      email,
    });
  } catch (error) {
    console.log('createPosts: ', error.message);
  }
};

export const allPosts = async () => {
  const dataPost = [];
  try {
    const allPost = await getDocs(collection(db, 'posts'));
    allPost.forEach(post => dataPost.push(post.data()));

    return dataPost;
  } catch (error) {
    console.log('allPosts: ', error.message);
  }
};

export const addLike = async (id, email) => {
  try {
    // console.log(email);
    await updateDoc(doc(db, 'posts', `${id}`), {
      likes: arrayUnion(email),
    });
  } catch (error) {
    console.log('addLike: ', error.message);
  }
};

export const sendComment = async ({ id, ...commentData }) => {
  try {
    await updateDoc(doc(db, 'posts', `${id}`), {
      comments: arrayUnion(commentData),
    });
  } catch (error) {
    console.log('sendComment: ', error.message);
  }
};

export const removePost = async id => {
  try {
    await deleteDoc(doc(db, 'posts', `${id}`));
  } catch (error) {
    console.log('removePost: ', error.message);
  }
};
