import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { setAvatarStorage, setPostsStorage } from '../firebase/storage';
import {
  addLike,
  allPosts,
  createPosts,
  rejecterUser,
  removePost,
  sendComment,
  setCurrentUser,
  updateUserAvatar,
} from '../firebase/firestore';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUser = createAsyncThunk(
  'user/create',
  async ({ email, password, avatar, login }, { rejectWithValue }) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const id = newUser.user.uid; // індетифікація user, його унікальний id (типу token)

      let url =
        'https://www.coachhousevets.com/wp-content/uploads/2023/04/no-photo-icon-22.png';
      if (avatar) {
        const response = await fetch(avatar);
        const file = await response.blob();
        url = await setAvatarStorage(file, id);
      }

      await rejecterUser({ email, url, login, id }); // записує user у firebase
      return { email, url, login, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  'user/auth',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const setUser = await signInWithEmailAndPassword(auth, email, password);
      const id = setUser.user.uid; // індетифікація user
      const credential = await setCurrentUser(id); // перевіряємо, отримуємо користувача з бази

      return { ...credential, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ id, newAvatar }, { rejectWithValue }) => {
    try {
      let url = '';
      if (newAvatar) {
        const response = await fetch(newAvatar);
        const file = await response.blob();
        url = await setPostsStorage(file, id);
      }

      await updateUserAvatar(id, url);
      return url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'post/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'post/create',
  async (
    { photoUri, name, locationName, geolocation, email },
    { rejectWithValue }
  ) => {
    try {
      const { creationTime } = await MediaLibrary.createAssetAsync(photoUri);

      let url = '';
      if (photoUri) {
        const response = await fetch(photoUri);
        const file = await response.blob();
        url = await setPostsStorage(file, creationTime);
      }

      await createPosts({
        url,
        name,
        locationName,
        geolocation,
        creationTime,
        email,
      });

      return {
        url,
        name,
        locationName,
        geolocation,
        creationTime,
        email,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await allPosts();
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLike = createAsyncThunk(
  'post/getLike',
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const like = await addLike(id, email);
      return { id, email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async (commentData, { rejectWithValue }) => {
    try {
      await sendComment(commentData);
      return commentData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await removePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
